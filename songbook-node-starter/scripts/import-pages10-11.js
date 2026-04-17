const fs = require("fs");
const path = require("path");

const songs = [
  {
    id: "the-windows-of-heaven-are-open",
    raw: `{title: The Windows of Heaven Are Open}
{key: G}
{categories: general}

[Verse]
[G]The windows of heaven are [C]open
[D]God is blessing, are falling to[G]night
[G]I’ve been to Jesus, joy, joy in my [C]heart
[D]Since Jesus made everything [G]right

[Verse]
[G]I gave Him my old tattered gar[C]ment
[D]He gave me a robe of pure [G]white
[G]I’m feasting on manna from [C]heaven
[D]And that’s why I’m happy to[G]night
`
  },
  {
    id: "reach-out-and-touch-the-lord",
    raw: `{title: Reach Out and Touch the Lord}
{key: G}
{categories: general}

[Verse]
[G]Reach out and touch the [C]Lord
[D]As He goes by
[G]You will find He’s not too [C]busy
[D]To answer your cry

[Verse]
[G]He’s passing by this [C]moment
[D]Your needs to sup[G]ply
[G]Reach out and touch the [C]Lord
[D]As He goes [G]by
`
  },
  {
    id: "if-you-were-to-try-real-joy",
    raw: `{title: If You Were to Try Real Joy}
{key: G}
{categories: general}

[Verse]
[G]If you were to try real [C]joy
[D]You would find it only in [G]Jesus
[G]He will never let you [C]down
[D]He will never let you [G]down

[Verse]
[G]Your life He’ll make it [C]new
[D]If you want joy real [G]joy
[G]Just come into your [C]heart
[D]Let Jesus come into your [G]heart
`
  },
  {
    id: "hallelujah",
    raw: `{title: Hallelujah}
{key: G}
{categories: general}

[Verse]
[G]Hallelujah, halle[C]lujah
[D]Hallelujah, halle[G]lujah

[Verse]
[G]Thank You Je[C]sus
[D]Thank You Je[G]sus
[G]Thank You Je[C]sus
[D]Thank You [G]Lord
`
  },
  {
    id: "bless-the-lord-o-my-soul",
    raw: `{title: Bless the Lord O My Soul}
{key: D}
{categories: general}

[Verse]
[D]Bless the Lord, O my [G]soul
[A]And all that is within [D]me
[D]Bless His holy [G]name
[A]Bless His holy [D]name

[Verse]
[D]For He has done great [G]things
[A]He has done great [D]things
[D]He has done great [G]things
[A]Bless His holy [D]name
`
  },
  {
    id: "king-of-glory",
    raw: `{title: King of Glory}
{key: G}
{categories: general}

[Verse]
[G]King of glory, peace and [C]righteousness
[D]Son of God, the King of [G]kings
[G]His name is Jesus, Je[C]sus
[D]Jesus Christ, the King of [G]kings

[Verse]
[G]Lord of lords, Saviour, [C]King
[D]Jesus Christ, my [G]King
`
  },
  {
    id: "thank-you-lord-for-saving-my-soul",
    raw: `{title: Thank You Lord for Saving My Soul}
{key: G}
{categories: general}

[Verse]
[G]Thank You Lord for saving my [C]soul
[D]Thank You Lord for making me [G]whole
[G]Thank You Lord for giving to [C]me
[D]Thy great salvation so [G]free
`
  },
  {
    id: "hes-coming-soon",
    raw: `{title: He’s Coming Soon}
{key: G}
{categories: general}

[Verse]
[G]He’s coming soon, yes, [C]coming soon
[D]With joy we welcome His re[G]turning
[G]It may be morning, night or [C]noon
[D]We know He’s coming [G]soon
`
  },
  {
    id: "into-my-heart",
    raw: `{title: Into My Heart}
{key: G}
{categories: general}

[Verse]
[G]Into my heart, into my [C]heart
[D]Come into my heart, Lord [G]Jesus
[G]Come in to[C]day, come in to [G]stay
[D]Come into my heart, Lord [G]Jesus
`
  },
  {
    id: "he-is-my-everything",
    raw: `{title: He Is My Everything}
{key: G}
{categories: general}

[Verse]
[G]He is my everything, He is my [C]all
[D]He is my everything, both great and [G]small
[G]He gave His life for me, made everything [C]new
[D]He is my everything, now how about [G]you
`
  },
  {
    id: "sweet-honey-in-the-rock",
    raw: `{title: Sweet Honey in the Rock}
{key: G}
{categories: general}

[Verse]
[G]Sweet honey in the [C]rock
[D]Water in the stone
[G]Manna on the [C]ground
[D]Where the children [G]roam

[Verse]
[G]Praise the name of [C]Jesus
[D]He is the Rock
[G]He is the Rock of [C]my salvation
[D]Sweet honey in the [G]rock
`
  },
  {
    id: "got-any-rivers",
    raw: `{title: Got Any Rivers}
{key: G}
{categories: general}

[Verse]
[G]Got any rivers you think are un[C]crossable
[D]Got any mountains you cannot [G]tunnel through
[G]God specialises in things thought im[C]possible
[D]And He can do what no other [G]can do
`
  }
];

const songsDir = path.join(__dirname, "..", "songs");
if (!fs.existsSync(songsDir)) {
  fs.mkdirSync(songsDir, { recursive: true });
}

for (const song of songs) {
  fs.writeFileSync(path.join(songsDir, `${song.id}.cho`), song.raw, "utf8");
}

console.log(`Imported ${songs.length} songs into /songs`);
