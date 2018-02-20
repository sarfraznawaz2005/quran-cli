const fs = require('fs');
const xml = require('xml2js');
const colors = require('colors');
const Table = require('cli-table2');

const parser = new xml.Parser();

let meta = [];
let quran = [];
let meaning = [];
let chapterList = [];

// lists all chapters of the Holy Quran
const chapters = () => {
    readData(listChapters)
};

// lists chapter/verse detail
const read = (chapter, verse, arabic) => {
    readData(() => getDetails(chapter, verse, arabic));
};

// get chapter info
const info = (chapter) => {
    readData(() => getChapterInfo(chapter));
}

// search for given keyword in all chapters translations
const search = function (keyword, arabic) {
    readData(() => searchTranslations(keyword, arabic));
}

function listChapters() {
    let table = new Table({ head: [colors.cyan('Index'), colors.cyan('Chapter')] });

    chapterList.forEach(function (chapter) {
        table.push([colors.green(chapter.index), colors.yellow(chapter.name)]);
    });

    print(table.toString());
}

function getChapterInfo(chapter) {
    // cause indexing starts at 0
    --chapter;

    if (chapter < 0 || chapter > 113) {
        print(colors.red('Invalid chapter number.'));
        process.exit(1);
    }

    let table = new Table({
        head: [
            colors.green('Index'),
            colors.green('Name'),
            colors.green('Arabic'),
            colors.green('English'),
            colors.green('Verses'),
            colors.green('Rukus'),
            colors.green('Start'),
            colors.green('Type'),
            colors.green('Order')
        ]
    });

    table.push([
        chapterList[chapter].index,
        chapterList[chapter].name,
        chapterList[chapter].aname,
        chapterList[chapter].ename,
        chapterList[chapter].ayas,
        chapterList[chapter].rukus,
        chapterList[chapter].start,
        chapterList[chapter].type,
        chapterList[chapter].order
    ]);

    print(colors.yellow(table.toString()));
}

function getDetails(chapter, verse, arabic) {
    // cause indexing starts at 0
    --chapter;

    if (chapter < 0 || chapter > 113) {
        print(colors.red('Invalid chapter number.'));
        process.exit(1);
    }

    if (!verse || verse == 0) {
        getEntireChapter(chapter, arabic);
    }
    else {
        getChapterVerse(chapter, verse, arabic);
    }
}

function getEntireChapter(chapter, arabic) {

    if (isNaN(chapter)) {
        print(colors.red('Invalid chapter number.'));
        process.exit(1);
    }

    let table = new Table({
        colWidths: [null, 80],
        wordWrap: true,
        style: { head: [], border: [] }
    });

    table.push(
        [{ colSpan: 2, content: colors.green(quran[chapter].$.index + ' : ' + quran[chapter].$.name) }]
    );

    table.push(
        [colors.cyan('Verse'), colors.cyan('Text')]
    );

    table = setVerses(table, chapter, quran[chapter].aya, arabic);

    print(table.toString());
}

function getChapterVerse(chapter, verse, arabic) {

    let isRange = verse.includes(':');

    let table = new Table({
        colWidths: [null, 80],
        wordWrap: true,
        style: { head: [], border: [] }
    });

    table.push(
        [{ colSpan: 2, content: colors.green(quran[chapter].$.index + ' : ' + quran[chapter].$.name) }]
    );

    table.push(
        [colors.cyan('Verse'), colors.cyan('Text')]
    );

    if (isRange) {
        let range = verse.split(':');

        let ayas = quran[chapter].aya.slice(--range[0], range[1]);

        table = setVerses(table, chapter, ayas, arabic, isRange);
    }
    else {

        // cause indexing starts at 0
        --verse;

        if (verse < 0) {
            print(colors.red('Invalid verse number.'));
            process.exit(1);
        }

        let aya = quran[chapter].aya[verse];

        if (typeof aya === 'undefined') {
            print(colors.red('Invalid verse number.'));
            process.exit(1);
        }

        table = setVerses(table, chapter, aya, arabic);
    }

    print(table.toString());
}

function readData(callback) {

    fs.readFile(__dirname + '/data/quran-data.xml', function (err, data) {
        parser.parseString(data, function (err, result) {
            meta = result.quran.suras[0];

            for (let i = 0; i <= 113; i++) {
                chapterList.push({
                    index: (i + 1),
                    name: meta.sura[i].$.tname,
                    ename: meta.sura[i].$.ename,
                    aname: meta.sura[i].$.name,
                    ayas: meta.sura[i].$.ayas,
                    rukus: meta.sura[i].$.rukus,
                    start: meta.sura[i].$.start,
                    type: meta.sura[i].$.type,
                    order: meta.sura[i].$.order
                });
            }

            fs.readFile(__dirname + '/data/ar.quran.xml', function (err, data) {
                parser.parseString(data, function (err, result) {
                    quran = result.quran.sura;

                    fs.readFile(__dirname + '/data/en.sahih.xml', function (err, data) {
                        parser.parseString(data, function (err, result) {
                            meaning = result.quran.sura;

                            callback();
                        });
                    });
                });
            });

        });
    });
}

function setVerses(table, chapter, verses, arabic, isRange) {

    if (Array.isArray(verses)) {
        verses.forEach(function (aya) {

            // by default, we show arabic text or when specified so
            if (!arabic || arabic != 0) {
                table.push([
                    colors.yellow(aya.$.index),
                    colors.yellow(aya.$.text)
                ]);
            }

            --aya.$.index;

            // we always show english text (for non-muslims or those who don't know arabic)
            // so that they can know the Truth and religion chosen by Allah for humans.            
            table.push([
                meaning[chapter].aya[aya.$.index].$.index,
                meaning[chapter].aya[aya.$.index].$.text
            ]);

        });
    }
    else {

        if (!arabic || arabic != 0) {
            table.push([
                colors.yellow(verses.$.index),
                colors.yellow(verses.$.text)
            ]);
        }

        --verses.$.index;

        table.push([
            meaning[chapter].aya[verses.$.index].$.index,
            meaning[chapter].aya[verses.$.index].$.text
        ]);
    }

    return table;
}

function searchTranslations(keyword, arabic) {
    let results = [];

    meaning.forEach(function (chapter, index) {

        if (typeof chapter.aya[index] !== 'undefined') {
            let verse = chapter.aya[index].$.text;
            let verseNumber = chapter.aya[index].$.index;
            let chapterName = meta.sura[index].$.tname;
            let arabicText = '';

            // add arabic text too if needed
            if (!arabic || arabic != 0) {
                arabicText = quran[index].aya[index].$.text;
            }

            if (verse.includes(keyword) || verse.toLowerCase().includes(keyword)) {
                results.push({
                    chapter: chapter.$.index + ' - ' + chapterName,
                    verse: verseNumber,
                    arabic: arabicText,
                    text: verse
                });
            }
        }
    });

    if (results.length == 0) {
        print(colors.red('Nothing found for given text.'));
        return;
    }

    let rowSpan = 1;

    let table = new Table({
        colWidths: [null, null, 80],
        wordWrap: true,
        head: [
            colors.cyan('Chapter'),
            colors.cyan('Verse'),
            colors.cyan('Text')
        ]
    });

    results.forEach(function (result) {
        if (!arabic || arabic != 0) {
            table.push(
                [
                    { rowSpan: 2, vAlign: 'center', content: colors.green(result.chapter) },
                    { rowSpan: 2, vAlign: 'center', hAlign: 'center', content: colors.green(result.verse) },
                    { content: colors.yellow(result.arabic) },
                ],
                [result.text]
            );
        } else {
            table.push([
                { content: colors.green(result.chapter) },
                { hAlign: 'center', content: colors.green(result.verse) },
                result.text
            ]);
        }
    });

    print(table.toString());
}

function print(text) {
    console.log(text);
}


module.exports = { chapters, info, read, search };
