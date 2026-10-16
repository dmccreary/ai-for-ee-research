#!/usr/bin/env python3
"""Normalize blank-line spacing in quiz.md files."""
import pathlib
import re


def cleanup(text):
    # Ensure exactly one blank line after each --- separator before a question
    text = re.sub(r'^---\s*\n+(?=####\s+\d+\.)', '---\n\n', text, flags=re.M)
    # Ensure exactly one blank line before each <div class="upper-alpha">
    text = re.sub(r'^(####\s+\d+\.\s*.+?)\n+(?=<div class="upper-alpha")', r'\1\n\n', text, flags=re.M)
    # Ensure exactly one blank line before ??? question admonition
    text = re.sub(r'^(</div>)\n+(?=\?\?\? question)', r'\1\n\n', text, flags=re.M)
    # Collapse multiple blank lines inside answer block to single blank line
    text = re.sub(r'^(\s{4}.*)\n\n+(?=\s{4})', r'\1\n\n', text, flags=re.M)
    # Remove trailing blank lines
    text = text.rstrip() + '\n'
    return text


def main():
    base = pathlib.Path('docs/chapters')
    for quiz in sorted(base.glob('*/quiz.md')):
        original = quiz.read_text()
        cleaned = cleanup(original)
        if cleaned != original:
            quiz.write_text(cleaned)
            print(f'Cleaned {quiz}')
        else:
            print(f'No change {quiz}')


if __name__ == '__main__':
    main()
