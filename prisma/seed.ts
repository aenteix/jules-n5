import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const japaneseWords = [
  { hiragana: 'こんにちは', romaji: 'konnichiwa', meaning: 'Hello' },
  { hiragana: 'ありがとう', romaji: 'arigatou', meaning: 'Thank you' },
  { hiragana: 'さようなら', romaji: 'sayounara', meaning: 'Goodbye' },
  { hiragana: 'はい', romaji: 'hai', meaning: 'Yes' },
  { hiragana: 'いいえ', romaji: 'iie', meaning: 'No' },
  { hiragana: 'おはよう', romaji: 'ohayou', meaning: 'Good morning' },
  { hiragana: 'こんばんは', romaji: 'konbanwa', meaning: 'Good evening' },
  { hiragana: 'おやすみ', romaji: 'oyasumi', meaning: 'Good night' },
  { hiragana: 'わたし', romaji: 'watashi', meaning: 'I / Me' },
  { hiragana: 'あなた', romaji: 'anata', meaning: 'You' },
  { hiragana: 'ねこ', romaji: 'neko', meaning: 'Cat' },
  { hiragana: 'いぬ', romaji: 'inu', meaning: 'Dog' },
  { hiragana: 'ほん', romaji: 'hon', meaning: 'Book' },
  { hiragana: 'みず', romaji: 'mizu', meaning: 'Water' },
  { hiragana: 'たべる', romaji: 'taberu', meaning: 'To eat' },
  { hiragana: 'のむ', romaji: 'nomu', meaning: 'To drink' },
  { hiragana: 'いく', romaji: 'iku', meaning: 'To go' },
  { hiragana: 'くる', romaji: 'kuru', meaning: 'To come' },
  { hiragana: 'みる', romaji: 'miru', meaning: 'To see / To watch' },
  { hiragana: 'きく', romaji: 'kiku', meaning: 'To hear / To listen' },
  { hiragana: 'はなす', romaji: 'hanasu', meaning: 'To speak' },
  { hiragana: 'よむ', romaji: 'yomu', meaning: 'To read' },
  { hiragana: 'かく', romaji: 'kaku', meaning: 'To write' },
  { hiragana: 'いち', romaji: 'ichi', meaning: 'One' },
  { hiragana: 'に', romaji: 'ni', meaning: 'Two' },
  { hiragana: 'さん', romaji: 'san', meaning: 'Three' },
  { hiragana: 'よん', romaji: 'yon', meaning: 'Four' },
  { hiragana: 'ご', romaji: 'go', meaning: 'Five' },
  { hiragana: 'ろく', romaji: 'roku', meaning: 'Six' },
  { hiragana: 'なな', romaji: 'nana', meaning: 'Seven' },
  { hiragana: 'はち', romaji: 'hachi', meaning: 'Eight' },
  { hiragana: 'きゅう', romaji: 'kyuu', meaning: 'Nine' },
  { hiragana: 'じゅう', romaji: 'juu', meaning: 'Ten' },
  { hiragana: 'あか', romaji: 'aka', meaning: 'Red' },
  { hiragana: 'あお', romaji: 'ao', meaning: 'Blue' },
  { hiragana: 'しろ', romaji: 'shiro', meaning: 'White' },
  { hiragana: 'くろ', romaji: 'kuro', meaning: 'Black' },
  { hiragana: 'おおきい', romaji: 'ookii', meaning: 'Big' },
  { hiragana: 'ちいさい', romaji: 'chiisai', meaning: 'Small' },
  { hiragana: 'おいしい', romaji: 'oishii', meaning: 'Delicious' },
  { hiragana: 'たのしい', romaji: 'tanoshii', meaning: 'Fun' },
  { hiragana: 'うれしい', romaji: 'ureshii', meaning: 'Happy' },
  { hiragana: 'せんせい', romaji: 'sensei', meaning: 'Teacher' },
  { hiragana: 'がくせい', romaji: 'gakusei', meaning: 'Student' },
  { hiragana: 'がっこう', romaji: 'gakkou', meaning: 'School' },
  { hiragana: 'ともだち', romaji: 'tomodachi', meaning: 'Friend' },
  { hiragana: 'かぞく', romaji: 'kazoku', meaning: 'Family' },
  { hiragana: 'いえ', romaji: 'ie', meaning: 'House' },
  { hiragana: 'くるま', romaji: 'kuruma', meaning: 'Car' },
  { hiragana: 'でんしゃ', romaji: 'densha', meaning: 'Train' }
]

async function main() {
  console.log('Start seeding...')

  // Create a default deck
  const deck = await prisma.vocabularyDeck.create({
    data: {
      title: 'Basic Japanese',
      description: '50 basic Japanese words for beginners.',
    },
  })

  console.log(`Created deck: ${deck.title}`)

  // Create cards
  for (const word of japaneseWords) {
    const card = await prisma.card.create({
      data: {
        ...word,
        deckId: deck.id,
      },
    })
    console.log(`Created card: ${card.hiragana} (${card.meaning})`)
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
