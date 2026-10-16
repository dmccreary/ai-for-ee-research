# References: AI-Assisted Data Analysis and Scripting

1. [Exploratory data analysis](https://en.wikipedia.org/wiki/Exploratory_data_analysis) - Wikipedia - Describes examining datasets graphically and numerically before formal modeling. Supports the chapter's "look before computing" rule, with the techniques, plot types, and history that catch clipping, short records, and wrong frequencies.

2. [Data cleansing](https://en.wikipedia.org/wiki/Data_cleansing) - Wikipedia - Covers detecting and correcting or removing bad records, data quality criteria, and cleansing workflows. Relevant to the chapter's logged, justified cleaning rules and the difference between artifacts and genuine outliers.

3. [Project Jupyter](https://en.wikipedia.org/wiki/Project_Jupyter) - Wikipedia - Explains the origin of Jupyter from IPython, its kernels, and the notebook document model. Gives background for the notebook environment, cell-based execution, and why execution order can make notebook state hard to reproduce.

4. Exploratory Data Analysis (1st Edition) - John W. Tukey - Addison-Wesley - Tukey's founding text introduced the stem-and-leaf display and the box plot, and argued for examining data with simple hand-drawn summaries before modeling. This is the origin of the chapter's emphasis on exploration first.

5. The Visual Display of Quantitative Information (2nd Edition) - Edward R. Tufte - Graphics Press - Introduces the data-ink ratio and small multiples, with many worked redesigns of misleading charts. Clarifies what a plot supporting a claim must show: honest scales, labeled axes, and the data itself.

6. [Virtual Environments and Packages](https://docs.python.org/3/tutorial/venv.html) - Python Documentation - Official tutorial on creating a venv, activating it, and managing packages with pip, including freezing requirements. Directly supports the chapter's dependency management practice, with copyable commands for reproducible installs.

7. [Errors and Exceptions](https://docs.python.org/3/tutorial/errors.html) - Python Documentation - Official tutorial distinguishing syntax errors from exceptions, with try/except handling, raising exceptions, and exception chaining. Helps readers understand tracebacks and why catch-all handlers that agents add can hide failures.

8. [Matplotlib Quick Start Guide](https://matplotlib.org/stable/users/explain/quick_start.html) - Matplotlib - Official introduction to figures, axes, labels, units, legends, and styling, with annotated code and rendered examples. Gives the concrete plotting vocabulary needed to review or request an agent-written figure.

9. [10 Minutes to pandas](https://pandas.pydata.org/docs/user_guide/10min.html) - pandas Documentation - Short official tour of loading CSV files, selecting data, handling missing values, grouping, and plotting with runnable snippets. Useful for the cleaning and exploration steps an agent typically writes with pandas.

10. [Using as a command line tool](https://nbconvert.readthedocs.io/en/latest/usage.html) - nbconvert Documentation - Official guide to converting Jupyter notebooks to Python scripts, HTML, and other formats with command-line examples. Supports the notebook-to-script step that moves settled exploration into a reproducible script.
