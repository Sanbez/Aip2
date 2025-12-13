export interface Participant {
  id: string
  name: string
  avatar: string
}

export interface Host {
  id: string
  name: string
  avatar: string
  description: string
  eventsHosted: number
}

export interface Event {
  id: string
  title: string
  description: string
  fullDescription: string
  image: string
  images?: string[]
  price: number
  isFree: boolean
  maxAttendees: number
  currentAttendees: number
  date: string
  time: string
  location: string
  address: string
  category: string
  organizer: string
  status: "pending" | "approved" | "rejected" | "archived"
  tags: string[]
  // Пины
  isPromo?: boolean
  isFeatured?: boolean    // Избранное
  isExclusive?: boolean   // Эксклюзивное
  isNew?: boolean         // Новое
  // Метаданные модерации
  moderationComment?: string
  createdAt?: string
  moderatedAt?: string
  moderatedBy?: string
  host?: Host
  participants?: Participant[]
}

export const categories = [
  "Все категории",
  "Настольные игры",
  "Покер",
  "Шахматы",
  "Концерты",
  "Спектакли",
]

// Sample participants for events
const sampleParticipants: Participant[] = [
  { id: "p1", name: "Иван Т.", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "p2", name: "Мария К.", avatar: "https://i.pravatar.cc/150?img=5" },
  { id: "p3", name: "Алексей П.", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: "p4", name: "Елена С.", avatar: "https://i.pravatar.cc/150?img=9" },
  { id: "p5", name: "Дмитрий В.", avatar: "https://i.pravatar.cc/150?img=12" },
  { id: "p6", name: "Анна М.", avatar: "https://i.pravatar.cc/150?img=16" },
]

// Sample hosts for events
const sampleHosts: Host[] = [
  { id: "h1", name: "Александр Петров", avatar: "https://i.pravatar.cc/150?img=11", description: "Профессиональный ведущий настольных игр с 10-летним стажем", eventsHosted: 156 },
  { id: "h2", name: "Виктория Смирнова", avatar: "https://i.pravatar.cc/150?img=20", description: "Организатор покерных турниров, сертифицированный дилер", eventsHosted: 89 },
  { id: "h3", name: "Михаил Козлов", avatar: "https://i.pravatar.cc/150?img=33", description: "Международный мастер ФИДЕ, тренер по шахматам", eventsHosted: 234 },
  { id: "h4", name: "Ольга Новикова", avatar: "https://i.pravatar.cc/150?img=25", description: "Театральный критик и организатор культурных мероприятий", eventsHosted: 67 },
]

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Турнир по Dungeons & Dragons",
    description: "Эпическое приключение для любителей настольных ролевых игр",
    fullDescription:
      "Приглашаем на большой турнир по D&D! Опытные мастера проведут захватывающие сессии для игроков любого уровня. Призы для лучших команд, атмосферные декорации и полное погружение в мир фэнтези. Все материалы предоставляются.",
    image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&q=80",
      "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&q=80",
    ],
    price: 500,
    isFree: false,
    maxAttendees: 48,
    currentAttendees: 42,
    date: "2025-12-15",
    time: "14:00",
    location: "Клуб «Dice & Dragons»",
    address: "ул. Гоблинов, 25",
    category: "Настольные игры",
    organizer: "D&D Community",
    status: "approved",
    tags: ["D&D", "ролевые игры", "настолки"],
    isPromo: true,
    host: sampleHosts[0],
    participants: sampleParticipants.slice(0, 5),
  },
  {
    id: "2",
    title: "Покерный турнир Texas Hold'em",
    description: "Еженедельный турнир с призовым фондом",
    fullDescription:
      "Классический турнир по Техасскому Холдему для игроков всех уровней. Призовой фонд формируется из взносов участников. Профессиональные дилеры, комфортная атмосфера, прохладительные напитки включены. Только 18+.",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?w=800&q=80",
    price: 2000,
    isFree: false,
    maxAttendees: 64,
    currentAttendees: 58,
    date: "2025-12-10",
    time: "19:00",
    location: "Покер-клуб «Royal Flush»",
    address: "пр. Ленина, 42",
    category: "Покер",
    organizer: "Royal Flush Club",
    status: "approved",
    tags: ["покер", "холдем", "турнир"],
    isPromo: true,
    host: sampleHosts[1],
    participants: sampleParticipants.slice(0, 6),
  },
  {
    id: "3",
    title: "Шахматный блиц-турнир",
    description: "Быстрые шахматы для всех возрастов",
    fullDescription:
      "Открытый блиц-турнир по шахматам! Контроль времени 5+3. Швейцарская система, 9 туров. Призы для трёх лучших игроков и специальные номинации для детей и ветеранов. Рейтинг ФИДЕ не требуется.",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80",
    price: 300,
    isFree: false,
    maxAttendees: 100,
    currentAttendees: 76,
    date: "2025-12-20",
    time: "11:00",
    location: "Шахматный клуб «Ферзь»",
    address: "ул. Каспарова, 1",
    category: "Шахматы",
    organizer: "Городская шахматная федерация",
    status: "approved",
    tags: ["шахматы", "блиц", "турнир"],
    host: sampleHosts[2],
    participants: sampleParticipants.slice(0, 4),
  },
  {
    id: "4",
    title: "Вечер настольных игр «Манчкин»",
    description: "Весёлая карточная игра для компании друзей",
    fullDescription:
      "Приглашаем на турнир по легендарной игре Манчкин! Победите монстров, украдите сокровища и подставьте друзей на пути к победе. Все наборы предоставляются. Отличный вариант для новичков в настольных играх.",
    image: "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=800&q=80",
    price: 0,
    isFree: true,
    maxAttendees: 32,
    currentAttendees: 24,
    date: "2025-12-12",
    time: "18:00",
    location: "Антикафе «Время играть»",
    address: "ул. Мира, 15",
    category: "Настольные игры",
    organizer: "Антикафе «Время играть»",
    status: "approved",
    tags: ["манчкин", "карточные игры", "настолки"],
    host: sampleHosts[0],
    participants: sampleParticipants.slice(0, 3),
  },
  {
    id: "5",
    title: "Концерт джазового квартета",
    description: "Живой джаз в уютной атмосфере",
    fullDescription:
      "Вечер живого джаза в исполнении квартета «Smooth Notes». В программе классические стандарты и авторские композиции. Камерная атмосфера, свечи, отличное вино. Количество мест ограничено.",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80",
    price: 1500,
    isFree: false,
    maxAttendees: 80,
    currentAttendees: 72,
    date: "2025-12-25",
    time: "20:00",
    location: "Джаз-клуб «Blue Note»",
    address: "ул. Армстронга, 7",
    category: "Концерты",
    organizer: "Blue Note Jazz Club",
    status: "approved",
    tags: ["джаз", "живая музыка", "концерт"],
    isPromo: true,
    host: sampleHosts[3],
    participants: sampleParticipants.slice(0, 5),
  },
  {
    id: "6",
    title: "Спектакль «Мастер и Маргарита»",
    description: "Культовый роман Булгакова на сцене",
    fullDescription:
      "Драматический театр представляет масштабную постановку бессмертного романа М.А. Булгакова. Три часа магии, любви и сатиры. Новаторское прочтение классики с использованием современных технологий. Антракт с угощениями.",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80",
    price: 2500,
    isFree: false,
    maxAttendees: 400,
    currentAttendees: 385,
    date: "2025-12-18",
    time: "19:00",
    location: "Драматический театр",
    address: "ул. Театральная, 5",
    category: "Спектакли",
    organizer: "Городской драмтеатр",
    status: "approved",
    tags: ["театр", "Булгаков", "драма"],
    isPromo: true,
    host: sampleHosts[3],
    participants: sampleParticipants.slice(0, 6),
  },
  {
    id: "7",
    title: "Турнир по Омахе Hi-Lo",
    description: "Продвинутый покер для опытных игроков",
    fullDescription:
      "Специальный турнир для любителей сложных покерных дисциплин. Омаха Hi-Lo с профессиональными дилерами. Гарантированный призовой фонд 100,000₽. Только для игроков с опытом. Бай-ин включает ужин.",
    image: "https://images.unsplash.com/photo-1541278107931-e006523892df?w=800&q=80",
    price: 5000,
    isFree: false,
    maxAttendees: 32,
    currentAttendees: 28,
    date: "2025-12-21",
    time: "18:00",
    location: "Покер-клуб «Royal Flush»",
    address: "пр. Ленина, 42",
    category: "Покер",
    organizer: "Royal Flush Club",
    status: "approved",
    tags: ["покер", "омаха", "турнир"],
    host: sampleHosts[1],
    participants: sampleParticipants.slice(0, 4),
  },
  {
    id: "8",
    title: "Сеанс одновременной игры",
    description: "Сыграйте с международным мастером",
    fullDescription:
      "Уникальная возможность сыграть партию с международным мастером ФИДЕ Александром Петровым. Сеанс одновременной игры на 30 досках. После сеанса — разбор партий и автограф-сессия. Участие бесплатное по предварительной записи.",
    image: "https://images.unsplash.com/photo-1580541832626-2a7131ee809f?w=800&q=80",
    price: 0,
    isFree: true,
    maxAttendees: 30,
    currentAttendees: 30,
    date: "2025-12-14",
    time: "15:00",
    location: "Дворец культуры",
    address: "пл. Победы, 3",
    category: "Шахматы",
    organizer: "Городская шахматная федерация",
    status: "approved",
    tags: ["шахматы", "сеанс", "мастер"],
    host: sampleHosts[2],
    participants: sampleParticipants.slice(0, 6),
  },
  {
    id: "9",
    title: "Игротека «Колонизаторы»",
    description: "Классика настольных игр для всей семьи",
    fullDescription:
      "Турнир по легендарной игре Catan (Колонизаторы). Стройте поселения, торгуйте ресурсами и станьте главным колонизатором острова! Идеально для семей и компаний друзей. Победители получают наборы игр в подарок.",
    image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&q=80",
    price: 400,
    isFree: false,
    maxAttendees: 40,
    currentAttendees: 36,
    date: "2025-12-16",
    time: "13:00",
    location: "Игровой клуб «Hobby Games»",
    address: "ул. Геймеров, 12",
    category: "Настольные игры",
    organizer: "Hobby Games",
    status: "approved",
    tags: ["колонизаторы", "catan", "настолки"],
    host: sampleHosts[0],
    participants: sampleParticipants.slice(0, 5),
  },
  {
    id: "10",
    title: "Рок-концерт: Кино Tribute",
    description: "Лучшие хиты Виктора Цоя",
    fullDescription:
      "Трибьют-концерт, посвящённый творчеству группы «Кино». Все главные хиты: «Группа крови», «Звезда по имени Солнце», «Перемен» и многие другие. Живой звук, атмосфера 80-х, специальные гости.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    price: 1800,
    isFree: false,
    maxAttendees: 500,
    currentAttendees: 450,
    date: "2025-12-22",
    time: "20:00",
    location: "Концертный зал «Октябрь»",
    address: "ул. Рок-н-ролла, 15",
    category: "Концерты",
    organizer: "Rock City Promotion",
    status: "approved",
    tags: ["рок", "Кино", "Цой"],
    host: sampleHosts[3],
    participants: sampleParticipants.slice(0, 6),
  },
]
