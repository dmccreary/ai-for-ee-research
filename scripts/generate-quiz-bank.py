#!/usr/bin/env python3
"""Parse all chapter quiz.md files and write docs/learning-graph/quiz-bank.json."""
import json
import re
import pathlib
from collections import Counter


def parse_quiz(path):
    text = path.read_text()
    # Split on horizontal rules; keep blocks that look like questions
    parts = re.split(r'^---\s*$', text, flags=re.M)
    questions = []
    for block in parts:
        if not re.search(r'^####\s+(\d+)\.', block, re.M):
            continue
        qnum_match = re.search(r'^####\s+(\d+)\.\s*(.+?)$', block, re.M)
        if not qnum_match:
            continue
        qnum = int(qnum_match.group(1))
        qtext = qnum_match.group(2).strip()

        # Options inside upper-alpha div
        opts_match = re.search(
            r'<div class="upper-alpha" markdown>\n'
            r'1\.\s*(.+?)\n'
            r'2\.\s*(.+?)\n'
            r'3\.\s*(.+?)\n'
            r'4\.\s*(.+?)\n'
            r'</div>',
            block,
            re.S | re.M,
        )
        if not opts_match:
            continue
        options = {
            'A': opts_match.group(1).strip(),
            'B': opts_match.group(2).strip(),
            'C': opts_match.group(3).strip(),
            'D': opts_match.group(4).strip(),
        }

        ans_match = re.search(r'The correct answer is \*\*([A-D])\*\*', block)
        if not ans_match:
            continue
        correct = ans_match.group(1)

        # Explanation: everything after the correct answer statement until Concept Tested
        exp_match = re.search(
            r'The correct answer is \*\*[A-D]\*\*\.\s*(.+?)\n\n\s*\*\*Concept Tested:\*\*',
            block,
            re.S,
        )
        explanation = exp_match.group(1).strip() if exp_match else ''

        concept_match = re.search(r'\*\*Concept Tested:\*\*\s*(.+?)$', block, re.M)
        concept = concept_match.group(1).strip() if concept_match else ''

        see_match = re.search(r'\*\*See:\*\*\s*(.+?)$', block, re.M)
        see = see_match.group(1).strip() if see_match else ''

        questions.append({
            'id': f'{path.parent.name}-q{qnum:03d}',
            'chapter': path.parent.name,
            'number': qnum,
            'question_text': qtext,
            'options': options,
            'correct_answer': correct,
            'explanation': explanation,
            'bloom_level': 'Intermediate',  # placeholder; not encoded in files
            'difficulty': 'medium',
            'concept': concept,
            'source_link': see,
            'tags': [],
        })
    return questions


def main():
    base = pathlib.Path('docs/chapters')
    all_questions = []
    for quiz in sorted(base.glob('*/quiz.md')):
        all_questions.extend(parse_quiz(quiz))

    bank = {
        'textbook_title': 'AI for EE Research: From Researcher to Orchestrator',
        'generated_date': '2026-10-15',
        'total_chapters': len(list(base.glob('*/quiz.md'))),
        'total_questions': len(all_questions),
        'questions': all_questions,
    }

    out_path = pathlib.Path('docs/learning-graph/quiz-bank.json')
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(bank, indent=2))
    print(f'Wrote {len(all_questions)} questions to {out_path}')


if __name__ == '__main__':
    main()
