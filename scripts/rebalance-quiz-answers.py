#!/usr/bin/env python3
"""Rebalance correct-answer letters in quiz.md files to A/B/C/D ≈ 2-3 each."""
import re
import sys
import pathlib


def parse_questions(text):
    """Split quiz text into question blocks separated by '---' rules."""
    # Drop the header preamble before the first question
    parts = re.split(r'^---\s*$', text, flags=re.M)
    blocks = []
    for p in parts:
        if re.search(r'^####\s+\d+\.', p, re.M):
            blocks.append(p)
    return blocks


def extract_correct_letter(block):
    m = re.search(r'The correct answer is \*\*([A-D])\*\*', block)
    return m.group(1) if m else None


def swap_correct_to_letter(block, target_letter):
    """Move the currently-correct option into the target_letter slot and the old target option into the correct slot."""
    letter_to_idx = {'A': 0, 'B': 1, 'C': 2, 'D': 3}

    correct_match = re.search(r'The correct answer is \*\*([A-D])\*\*', block)
    if not correct_match:
        return block
    correct = correct_match.group(1)
    if correct == target_letter:
        return block

    correct_idx = letter_to_idx[correct]
    target_idx = letter_to_idx[target_letter]

    div_pattern = re.compile(
        r'(<div class="upper-alpha" markdown>\n)'
        r'(1\. .*\n)'
        r'(2\. .*\n)'
        r'(3\. .*\n)'
        r'(4\. .*\n)'
        r'(</div>)',
        re.M,
    )
    m = div_pattern.search(block)
    if not m:
        return block

    options = [m.group(2), m.group(3), m.group(4), m.group(5)]
    # Swap correct option with target slot option
    options[correct_idx], options[target_idx] = options[target_idx], options[correct_idx]
    # Renumber
    new_options = []
    for i, opt in enumerate(options, start=1):
        new_options.append(re.sub(r'^\d+\.', f'{i}.', opt, count=1))

    new_div = (
        m.group(1) + new_options[0] + new_options[1] + new_options[2] + new_options[3] + m.group(6)
    )
    new_block = block[:m.start()] + new_div + block[m.end():]

    # Update the correct answer letter in the explanation
    new_block = re.sub(
        r'The correct answer is \*\*[A-D]\*\*',
        f'The correct answer is **{target_letter}**',
        new_block,
        count=1,
    )
    return new_block


def rebalance_quiz(path):
    text = path.read_text()
    blocks = parse_questions(text)
    if len(blocks) != 10:
        print(f'  {path}: expected 10 questions, found {len(blocks)}', file=sys.stderr)
        return False

    # Determine current distribution
    counts = {'A': 0, 'B': 0, 'C': 0, 'D': 0}
    for b in blocks:
        letter = extract_correct_letter(b)
        if letter:
            counts[letter] += 1

    # Target: every letter 2 or 3 times for 10 questions.
    # Move excess letters into deficit letters.
    new_blocks = list(blocks)
    for target_letter in ['D', 'A', 'B', 'C']:
        while counts[target_letter] < 2:
            # Prefer donor letter that is over-represented (>3), then any non-target
            donor = None
            for i, b in enumerate(new_blocks):
                letter = extract_correct_letter(b)
                if letter and letter != target_letter and counts[letter] > 3:
                    donor = (i, letter)
                    break
            if donor is None:
                # Try any non-target to fix the deficit
                for i, b in enumerate(new_blocks):
                    letter = extract_correct_letter(b)
                    if letter and letter != target_letter:
                        donor = (i, letter)
                        break
            if donor is None:
                break
            donor_idx, donor_letter = donor
            new_blocks[donor_idx] = swap_correct_to_letter(new_blocks[donor_idx], target_letter)
            counts[donor_letter] -= 1
            counts[target_letter] += 1

    # If any letter is still >3, move excess to letters with count <3
    for donor_letter in ['B', 'C', 'A', 'D']:
        while counts[donor_letter] > 3:
            target = None
            for i, b in enumerate(new_blocks):
                letter = extract_correct_letter(b)
                if letter == donor_letter:
                    # Find a deficit letter to move to
                    for t in ['A', 'C', 'D', 'B']:
                        if counts[t] < 3 and t != donor_letter:
                            target = (i, t)
                            break
                    if target:
                        break
            if target is None:
                break
            idx, target_letter = target
            new_blocks[idx] = swap_correct_to_letter(new_blocks[idx], target_letter)
            counts[donor_letter] -= 1
            counts[target_letter] += 1

    # Reassemble with separators, preserving original header
    header_match = re.match(r'^(.*?)(?=^####\s+\d+\.)', text, re.M | re.S)
    header = header_match.group(1) if header_match else ''
    # Remove trailing separator-like text from header
    header = re.sub(r'---\s*\n+$', '', header)
    out = header.rstrip() + '\n\n---\n\n' + '\n\n---\n\n'.join(new_blocks) + '\n'
    path.write_text(out)

    new_counts = {'A': 0, 'B': 0, 'C': 0, 'D': 0}
    for b in parse_questions(out):
        letter = extract_correct_letter(b)
        if letter:
            new_counts[letter] += 1
    print(f'{path.parent.name}: {counts} -> {new_counts}')
    return True


def main():
    base = pathlib.Path('docs/chapters')
    for quiz in sorted(base.glob('*/quiz.md')):
        rebalance_quiz(quiz)


if __name__ == '__main__':
    main()
