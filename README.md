# quran-cli

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

`quran read 1` or with alias `quran r 1`

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen1.png)

***English Only***: To read 1st chapter for example, type: `quran read 1 0 0'. Here first `0` means no verse and second `0` means no Arabic text.

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen6.png)

**Read Specific Verse from a Chapter**

`quran read 2 2` or with alias `quran r 2 2`

![Chapters](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen2.png)

***English Only***: To read 25th verse of chapter 3 for example, type: `quran read 3 25 0'. Here `0` means no Arabic text.

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen5.png)

**Read Specified Range of Verses from a Chapter**

`quran read 12 1:5` or with alias `quran r 12 1:5`

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen3.png)

**Get Information about a Chapter**

`quran info 12` or with alias `quran i 12`

![Screenshot](https://raw.githubusercontent.com/sarfraznawaz2005/quran-cli/master/screen4.png)

**Get Help Information**

`quran --help`

# Todo

- Publish as npm module.

# License

This project is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
