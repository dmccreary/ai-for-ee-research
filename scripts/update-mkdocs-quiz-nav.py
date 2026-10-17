#!/usr/bin/env python3
"""Add Quiz: entries under each chapter in mkdocs.yml and add report under Learning Graph."""
import pathlib
import re


def main():
    path = pathlib.Path('mkdocs.yml')
    text = path.read_text()

    # Add Quiz: line after each Annotated References: line inside Chapters section
    # We only target lines under Chapters that have the references pattern.
    new_lines = []
    in_chapters = False
    for line in text.splitlines():
        new_lines.append(line)
        stripped = line.lstrip()
        if stripped == '- Chapters:':
            in_chapters = True
        elif in_chapters and stripped.startswith('- ') and 'Learning Graph' in stripped:
            in_chapters = False
        if in_chapters and re.match(r'\s+- Annotated References: chapters/\d{2}-[^/]+/references\.md', stripped):
            indent = len(line) - len(stripped) + 4  # add 4 spaces for child indent
            ref_path = stripped.split(': ', 1)[1]
            quiz_path = ref_path.replace('/references.md', '/quiz.md')
            new_lines.append(' ' * indent + f'- Quiz: {quiz_path}')

    text = '\n'.join(new_lines)

    # Add Quiz Generation Report under Learning Graph if not present
    if 'Quiz Generation Report' not in text:
        text = text.replace(
            '      - Glossary Quality Report: learning-graph/glossary-quality-report.md\n',
            '      - Glossary Quality Report: learning-graph/glossary-quality-report.md\n      - Quiz Generation Report: learning-graph/quiz-generation-report.md\n',
        )

    path.write_text(text)
    print('Updated mkdocs.yml')


if __name__ == '__main__':
    main()
