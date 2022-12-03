const data = [
  ["🔗|👨|🧊", "Цепь|на мне|— это ice"],
  ["🟣|🚗|➡️|🟣|🌇", "Малиновая|Лада|в|малиновый|закат"],
  ["💭 👤 🚫|👧|💕|🌸 ", "Незабудка|твой|любимый|цветок"],
  ["🥂|👄|🍼", "Dom Pérignon|во рту держишь,|как соску"],
  ["👧|👭|💚|👨|🚘", "Твои|подружки|хотят|ко мне|в Панамеру"],
  ["🎎📐|👧", "Barbiesize girl"],
  ["👨|1️⃣ 🕒", "Я|в моменте"],
  ["🔛|🥃|🔹|👥|🕺|🤏", "На|баре|синие|мы|танцуем|под минимал"]
]

const loadData = () => {
  const result = []

  for (const line of data) {
    const [emoji, text] = line
    const all_emoji = emoji.split('|')
    console.log(all_emoji)
    const all_text = text.split('|')

    const values = []
    all_emoji.forEach((one_emoji, i) => {
      values.push({
        'emoji': one_emoji,
        'text': all_text[i]
      })
    })

    result.push({value: values})
  }

  console.log(result)

  return result;
}

export default loadData;
