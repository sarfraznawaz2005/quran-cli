# :closed_book: quran-cli

Read/Recite The Holy Quran from the commandline with English translation.

# Requirements

- [NodeJS](http://nodejs.org)

# Installation

- Clone this repository. `git clone https://github.com/sarfraznawaz2005/quran-cli.git`
- Type `npm install`
- Type `npm link`

# Usage

**List All Chapters**

`quran chapters` or with alias `quran c`

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/chapters.png)

**Read Specific Chapter**

Command format is: `read|r <chapter> [verse] [arabic]` where `verse` and `arabic` arguments are optional.

To read 1st chapter:

`quran read 1` or with alias `quran r 1`

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen1.png)

***English Only***: To read 1st chapter for example, type: `quran read 1 0 0`. Here first `0` means no/all verses and second `0` means no Arabic text.

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen6.png)

**Read Specific Verse from a Chapter**

To read 2nd verse from 2nd chapter:

`quran read 2 2` or with alias `quran r 2 2`

![Chapters](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen2.png)

***English Only***: To read 25th verse of chapter 3 for example, type: `quran read 3 25 0`. Here `0` means no Arabic text.

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen5.png)

**Read Specified Range of Verses from a Chapter**

To read verses from 1 to 5 from 12th chapter:

`quran read 12 1:5` or with alias `quran r 12 1:5`

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen3.png)

**Search in Translation**

To search for word `book` for example:

`quran search book` or with alias `quran s book`

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen7.png)

***English Only***: Specify second arguments as `0` to hide arabic text: `quran search book 0`

**Note**: If search results are too much, they might not fit into cli buffer, in such case you can save search results to text file instead like here we search for word `Allah` to save into text file: `quran search Allah > filename.txt`

**Get Information about a Chapter**

`quran info 12` or with alias `quran i 12`

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen4.png)

**Get Help Information**

`quran --help`


## Similar Projects

- [The Holy Quran](https://github.com/sarfraznawaz2005/holy-quran)
- [Quran Chrome Extension](https://github.com/sarfraznawaz2005/quran-chrome)

# License

This project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
