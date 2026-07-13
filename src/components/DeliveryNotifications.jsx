// src/components/DeliveryNotifications.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Package, CheckCircle, MapPin, Clock } from 'lucide-react'

const DeliveryNotifications = () => {
  const [currentNotification, setCurrentNotification] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [progress, setProgress] = useState(100)
  const [nextDelay, setNextDelay] = useState(0)
  const timerRef = useRef(null)
  const progressRef = useRef(null)
  const audioRef = useRef(null)

  // 🎵 Son de notification depuis public/sounds/notif.wav
  const playNotificationSound = () => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {
          // Fallback si le son ne peut pas être joué
          playFallbackSound()
        })
      } else {
        // Créer l'audio s'il n'existe pas encore
        const audio = new Audio('/sounds/notif.wav')
        audio.volume = 0.4
        audioRef.current = audio
        audio.play().catch(() => {
          playFallbackSound()
        })
      }
    } catch (error) {
      playFallbackSound()
    }
  }

  // 🔄 Son de secours (si le fichier wav ne charge pas)
  const playFallbackSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      const osc1 = audioContext.createOscillator()
      const gain1 = audioContext.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(880, audioContext.currentTime)
      osc1.frequency.linearRampToValueAtTime(1100, audioContext.currentTime + 0.12)
      gain1.gain.setValueAtTime(0.25, audioContext.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2)
      osc1.connect(gain1)
      gain1.connect(audioContext.destination)
      osc1.start(audioContext.currentTime)
      osc1.stop(audioContext.currentTime + 0.2)

      setTimeout(() => {
        const osc2 = audioContext.createOscillator()
        const gain2 = audioContext.createGain()
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1200, audioContext.currentTime)
        osc2.frequency.linearRampToValueAtTime(1400, audioContext.currentTime + 0.08)
        gain2.gain.setValueAtTime(0.15, audioContext.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15)
        osc2.connect(gain2)
        gain2.connect(audioContext.destination)
        osc2.start(audioContext.currentTime)
        osc2.stop(audioContext.currentTime + 0.15)
      }, 130)
    } catch (e) {}
  }

  // Clés localStorage
  const STORAGE_KEY_USED = 'delivery_notifications_used'
  const STORAGE_KEY_INDEX = 'delivery_notifications_index'

  // 🇺🇳 500+ noms internationaux
  const allNames = [
    // USA (50)
    'James Smith', 'Mary Johnson', 'Robert Williams', 'Patricia Brown', 'Michael Jones',
    'Jennifer Garcia', 'William Miller', 'Linda Davis', 'David Rodriguez', 'Elizabeth Martinez',
    'Richard Hernandez', 'Susan Lopez', 'Joseph Wilson', 'Jessica Anderson', 'Thomas Taylor',
    'Sarah Thomas', 'Charles Moore', 'Karen Jackson', 'Christopher Martin', 'Nancy Lee',
    'Daniel Perez', 'Lisa Thompson', 'Matthew White', 'Betty Harris', 'Anthony Sanchez',
    'Helen Clark', 'Mark Ramirez', 'Sandra Lewis', 'Donald Robinson', 'Donna Walker',
    'Steven Young', 'Carol Allen', 'Paul King', 'Ruth Wright', 'Andrew Scott',
    'Sharon Torres', 'Joshua Nguyen', 'Michelle Hill', 'Kenneth Flores', 'Laura Green',
    'Kevin Adams', 'Sarah Nelson', 'Brian Baker', 'Kimberly Hall', 'George Rivera',
    'Amy Campbell', 'Timothy Mitchell', 'Angela Carter', 'Ronald Roberts', 'Melissa Turner',
    'Edward Phillips', 'Brenda Campbell', 'Jason Parker', 'Deborah Evans', 'Jeffrey Edwards',
    'Rebecca Collins', 'Ryan Stewart', 'Shirley Morris', 'Jacob Murphy', 'Cynthia Cook',
    'Gary Rogers', 'Kathleen Morgan', 'Nicholas Peterson', 'Pamela Cooper', 'Eric Reed',
    'Martha Bailey', 'Stephen Bell', 'Andrea Howard', 'Jonathan Ward', 'Janice Cox',
    'Larry Diaz', 'Frances Richardson', 'Justin Wood', 'Teresa Watson', 'Scott Brooks',
    'Diane Bennett', 'Brandon Gray', 'Julie James', 'Benjamin Reyes', 'Heather Cruz',
    'Samuel Hughes', 'Doris Price', 'Raymond Patterson', 'Gloria Simmons', 'Gregory Foster',
    'Kathryn Butler', 'Frank Sanders', 'Lois Coleman', 'Alexander Jenkins', 'Judy Perry',
    'Patrick Powell', 'Rose Long', 'Jack Patterson', 'Marilyn Hughes', 'Dennis Flores',
    'Tina Washington', 'Jerry Butler', 'Debra Simmons', 'Tyler Foster', 'Rachel Gonzales',
    'Jose Bryant', 'Mildred Alexander', 'Nathan Russell', 'Tina Griffin', 'Carlos Diaz',
    
    // UK (40)
    'Oliver Smith', 'Amelia Jones', 'George Williams', 'Isabella Brown', 'Harry Taylor',
    'Mia Davies', 'Jack Wilson', 'Charlotte Evans', 'Jacob Thomas', 'Emily Roberts',
    'Charlie Johnson', 'Ella Walker', 'Thomas Wright', 'Grace Thompson', 'James Anderson',
    'Lily Martin', 'William Clarke', 'Chloe Turner', 'Henry King', 'Sophie Cooper',
    'Alexander Hill', 'Lucy Baker', 'Samuel Harrison', 'Ellie Reed', 'Daniel Morgan',
    'Poppy Bell', 'Matthew Murphy', 'Evie Bailey', 'David Richardson', 'Zara Cox',
    'Joseph Howard', 'Layla Ward', 'Benjamin Wood', 'Isla Watson', 'Edward Brooks',
    'Megan Bennett', 'Harvey Gray', 'Ava James', 'Ethan Reynolds', 'Freya Ellis',
    
    // France (40)
    'Jean Dupont', 'Marie Martin', 'Pierre Durand', 'Sophie Lefebvre', 'Philippe Moreau',
    'Isabelle Laurent', 'Michel Simon', 'Catherine Michel', 'André Robert', 'Nathalie Richard',
    'François Petit', 'Elisabeth Dubois', 'Louis Lambert', 'Valérie Roche', 'Alain Leroy',
    'Monique Chevalier', 'Georges Fontaine', 'Dominique Rousseau', 'Jacques Lemoine',
    'Chantal Fabre', 'Maurice Garnier', 'Denise Moulin', 'Roger Roussel', 'Colette Gerard',
    'Jean-Pierre Boucher', 'Jacqueline David', 'Bernard Dubois', 'Simone Brun', 'Philippe Martin',
    'Odette Bernard', 'Xavier Thomas', 'Marie-Pierre Lefevre', 'Lucien Robert', 'Louise Simon',
    'André Petit', 'Martine Moreau', 'Jacques Laurent', 'Eliane Michel', 'Henri Dupont',
    'Juliette Girard', 'Marcel Rousseau', 'Danielle Lefebvre', 'Raymond Chevalier',
    
    // Germany (40)
    'Hans Schmidt', 'Anna Müller', 'Michael Weber', 'Maria Schneider', 'Klaus Fischer',
    'Lisa Wagner', 'Thomas Becker', 'Petra Hoffmann', 'Andreas Schulz', 'Claudia Koch',
    'Frank Richter', 'Ursula Bauer', 'Jürgen Klein', 'Sabine Wolf', 'Stefan Schröder',
    'Martina Neumann', 'Christian Schwarz', 'Sandra Zimmermann', 'Peter Braun', 'Manuela Krüger',
    'Dieter Hofmann', 'Andrea Hartmann', 'Uwe Lange', 'Brigitte Schmitt', 'Ralf Schmitz',
    'Nicole Kaiser', 'Marcel Fuchs', 'Diana Beck', 'Carsten Möller', 'Simone Schulze',
    'Günther Werner', 'Katrin Weber', 'Eckhard Meyer', 'Claudia König', 'Rainer Stein',
    'Margit Berger', 'Olaf Wagner', 'Karin Richter', 'Holger Frank', 'Monika Lehmann',
    
    // Italy (30)
    'Marco Rossi', 'Giulia Bianchi', 'Luca Romano', 'Sofia Gallo', 'Giuseppe Conti',
    'Martina Costa', 'Antonio Fontana', 'Chiara Rizzo', 'Francesco Lombardi', 'Elisa Moretti',
    'Alessandro Greco', 'Giorgia Barbieri', 'Matteo Marino', 'Francesca Costa', 'Stefano Giordano',
    'Sara Ferrara', 'Davide Santoro', 'Alessia De Luca', 'Roberto Bruno', 'Ilaria Caruso',
    'Daniele Rinaldi', 'Valentina D\'Angelo', 'Salvatore Colombo', 'Camilla Ricci', 'Gianluca Esposito',
    'Alice Gallo', 'Simone Martini', 'Elena Gatti', 'Claudio Leone', 'Federica Moretti',
    
    // Spain (30)
    'Carlos Garcia', 'Maria Rodriguez', 'Antonio Fernandez', 'Ana Lopez', 'Jose Martinez',
    'Isabel Gonzalez', 'Manuel Sanchez', 'Teresa Perez', 'Juan Martin', 'Elena Jimenez',
    'Francisco Ruiz', 'Cristina Hernandez', 'David Diaz', 'Rosa Alvarez', 'Javier Morales',
    'Carmen Navarro', 'Pedro Ortega', 'Lucia Ramos', 'Rafael Romero', 'Beatriz Delgado',
    'Jorge Torres', 'Sara Reyes', 'Alberto Castro', 'Paula Suarez', 'Angel Muñoz',
    'Nuria Soto', 'Fernando Pena', 'Lara Gil', 'Vicente Mendez', 'Eva Dominguez',
    
    // Japan (30)
    'Kenji Tanaka', 'Yuki Yamamoto', 'Taro Suzuki', 'Sakura Sato', 'Hiroshi Nakamura',
    'Ayumi Ito', 'Koji Kobayashi', 'Haruka Yoshida', 'Takeshi Suzuki', 'Mai Watanabe',
    'Shinji Nakamura', 'Akiko Saito', 'Ryo Takahashi', 'Miyuki Tanaka', 'Kazuki Yamamoto',
    'Yui Suzuki', 'Daiki Sato', 'Rina Kato', 'Shota Yamada', 'Mika Tanaka',
    'Takahiro Ito', 'Nana Kobayashi', 'Ryota Sato', 'Aya Yamamoto', 'Kenta Nakamura',
    'Risa Yamada', 'Yuto Suzuki', 'Saki Tanaka', 'Kei Sato', 'Moe Yamamoto',
    
    // Australia (20)
    'Jack Wilson', 'Mia Johnson', 'Thomas Brown', 'Emily Davis', 'Daniel Jones',
    'Emma Garcia', 'James Miller', 'Charlotte Rodriguez', 'Alexander Martinez', 'Mia Hernandez',
    'Ethan Williams', 'Sophia Lee', 'Jacob Thompson', 'Isabella White', 'William Harris',
    'Olivia Walker', 'Lucas Nelson', 'Amelia Wright', 'Benjamin Carter', 'Lily Mitchell',
    
    // Brazil (20)
    'João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Souza', 'Carlos Pereira',
    'Juliana Lima', 'Fernando Carvalho', 'Carla Almeida', 'Mariana Costa', 'Rafael Silva',
    'Beatriz Santos', 'Lucas Oliveira', 'Camila Souza', 'Bruna Santos', 'Gabriel Silva',
    'Vanessa Oliveira', 'Matheus Santos', 'Larissa Costa', 'Felipe Silva', 'Jessica Santos',
    
    // Russia (20)
    'Ivan Petrov', 'Olga Smirnov', 'Dmitri Ivanov', 'Natalia Kuznetsov', 'Alexei Popov',
    'Elena Sokolov', 'Sergei Fedorov', 'Tatiana Morozov', 'Andrei Volkov', 'Irina Lebedev',
    'Mikhail Kozlov', 'Svetlana Novikov', 'Pavel Tarasov', 'Daria Zaitsev', 'Viktor Belyaev',
    'Katerina Sokolov', 'Yuri Ivanov', 'Anastasia Petrov', 'Nikolai Kozlov', 'Ekaterina Smirnov',
    
    // Africa (20)
    'Mohammed Ali', 'Fatima Hassan', 'Omar Mahmoud', 'Aisha Ibrahim', 'Kofi Mensah',
    'Amara Nwosu', 'Kwame Asante', 'Zainab Kabir', 'Tunde Okafor', 'Chiamaka Eze',
    'Adeola Ogunleye', 'Ngozi Okonkwo', 'Sefu Mwangi', 'Abena Osei', 'Dayo Adebayo',
    'Chidi Obi', 'Nia Moyo', 'Kofi Anane', 'Amina Diallo', 'Sekou Toure',
    
    // India (40)
    'Raj Patel', 'Priya Sharma', 'Amit Singh', 'Neha Gupta', 'Vikram Kumar',
    'Anita Reddy', 'Sanjay Jain', 'Kavya Nair', 'Rahul Desai', 'Pooja Mehta',
    'Aakash Shah', 'Sneha Iyer', 'Ravi Verma', 'Divya Menon', 'Arjun Rao',
    'Aarti Joshi', 'Karan Malhotra', 'Riya Choudhary', 'Rohit Agarwal', 'Meera Krishnan',
    'Ajay Bhatia', 'Rani Pillai', 'Sunil Ghosh', 'Lakshmi Narayanan', 'Anjali Sinha',
    'Vijay Singh', 'Kiran Bedi', 'Suresh Reddy', 'Deepa Nair', 'Rakesh Kumar',
    'Gita Patel', 'Prakash Rao', 'Sheela Menon', 'Mahesh Shah', 'Kavitha Reddy',
    'Naveen Kumar', 'Sridevi Narayan', 'Mohan Rao', 'Radha Krishnan', 'Srinivas Iyer',
    
    // Middle East (20)
    'Ahmed Al-Farsi', 'Fatima Al-Saud', 'Mohammed Al-Rashid', 'Layla Al-Khalifa', 'Omar Al-Mansour',
    'Amira Al-Hassan', 'Khalid Al-Malki', 'Nora Al-Hussain', 'Sultan Al-Otaibi', 'Huda Al-Ghamdi',
    'Majid Al-Dossary', 'Samira Al-Jaber', 'Faisal Al-Mutawa', 'Nadia Al-Shammari', 'Tariq Al-Zahrani',
    'Reem Al-Qahtani', 'Abdullah Al-Sheikh', 'Mona Al-Harthi', 'Hamad Al-Thani', 'Rania Al-Faisal',
    
    // Scandinavia (20)
    'Erik Andersson', 'Anna Johansson', 'Lars Svensson', 'Elin Lindberg', 'Per Nilsson',
    'Karin Persson', 'Ulf Karlsson', 'Sofia Eriksson', 'Björn Larsson', 'Emma Jonsson',
    'Gunnar Andersson', 'Ingrid Svensson', 'Henrik Karlsson', 'Maria Lindström', 'Oscar Pettersson',
    'Matilda Berg', 'Johan Nilsson', 'Sara Persson', 'Anders Johansson', 'Elsa Olsson',
    
    // Autres (30)
    'Liam O\'Brien', 'Sofia Martin', 'Noah Garcia', 'Mia Martinez', 'Logan Johnson',
    'Ava Rodriguez', 'Mason Williams', 'Emma Davis', 'Carter Garcia', 'Sophia Miller',
    'Jackson Martinez', 'Olivia Rodriguez', 'Aiden Garcia', 'Charlotte Martinez', 'Lucas Williams',
    'Amelia Davis', 'Ethan Johnson', 'Isabella Garcia', 'Oliver Martinez', 'Mia Rodriguez',
    'James Garcia', 'Harper Martinez', 'Benjamin Davis', 'Evelyn Johnson', 'Alexander Rodriguez',
    'Abigail Garcia', 'Sebastian Martinez', 'Emily Davis', 'Henry Johnson', 'Elizabeth Garcia'
  ]

  // 🎲 Mélanger un tableau aléatoirement (Fisher-Yates)
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // 💾 Sauvegarder les données dans localStorage
  const saveToLocalStorage = (usedNames, currentIndex) => {
    try {
      localStorage.setItem(STORAGE_KEY_USED, JSON.stringify(usedNames))
      localStorage.setItem(STORAGE_KEY_INDEX, String(currentIndex))
    } catch (e) {
      // Ignorer les erreurs
    }
  }

  // 📥 Récupérer les données depuis localStorage
  const getFromLocalStorage = () => {
    try {
      const used = localStorage.getItem(STORAGE_KEY_USED)
      const index = localStorage.getItem(STORAGE_KEY_INDEX)
      return {
        usedNames: used ? JSON.parse(used) : [],
        currentIndex: index ? parseInt(index, 10) : 0
      }
    } catch (e) {
      return { usedNames: [], currentIndex: 0 }
    }
  }

  // 🎯 Obtenir le prochain nom aléatoire
  const getNextName = () => {
    const { usedNames, currentIndex } = getFromLocalStorage()
    
    if (usedNames.length >= allNames.length) {
      const shuffled = shuffleArray(allNames)
      const firstNames = shuffled.slice(0, 50)
      saveToLocalStorage(firstNames, 0)
      return shuffled[0]
    }

    const availableNames = allNames.filter(name => !usedNames.includes(name))
    
    if (availableNames.length === 0) {
      const shuffled = shuffleArray(allNames)
      saveToLocalStorage([shuffled[0]], 0)
      return shuffled[0]
    }

    const randomIndex = Math.floor(Math.random() * availableNames.length)
    const selectedName = availableNames[randomIndex]
    
    const newUsedNames = [...usedNames, selectedName]
    saveToLocalStorage(newUsedNames, currentIndex + 1)
    
    return selectedName
  }

  // 🔄 Réinitialiser après 50 noms
  const shouldResetAfter = 50
  const resetIfNeeded = () => {
    const { usedNames } = getFromLocalStorage()
    if (usedNames.length >= shouldResetAfter) {
      const shuffled = shuffleArray(allNames)
      const firstNames = shuffled.slice(0, Math.min(50, allNames.length))
      saveToLocalStorage(firstNames, 0)
      return true
    }
    return false
  }

  const getPackageType = () => {
    const types = ['Standard', 'Express', 'Fragile', 'Urgent', 'Perishable', 'Valuable', 'Medical', 'Oversized']
    return types[Math.floor(Math.random() * types.length)]
  }

  const getCountry = () => {
    const countries = [
      'USA', 'UK', 'France', 'Germany', 'Italy', 'Spain', 'Japan', 'Australia',
      'Brazil', 'Canada', 'Mexico', 'India', 'China', 'South Korea', 'Netherlands',
      'Switzerland', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Belgium', 'Austria',
      'Portugal', 'Greece', 'Turkey', 'Poland', 'Czech Republic', 'Hungary', 'Ireland',
      'New Zealand', 'Singapore', 'Malaysia', 'Thailand', 'Vietnam', 'Philippines',
      'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'Morocco', 'Israel', 'UAE',
      'Saudi Arabia', 'Kuwait', 'Qatar', 'Oman', 'Bahrain', 'Cyprus', 'Malta'
    ]
    return countries[Math.floor(Math.random() * countries.length)]
  }

  const getCity = (country) => {
    const cities = {
      'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
      'UK': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Edinburgh', 'Bristol', 'Sheffield', 'Leeds', 'Newcastle'],
      'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
      'Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen'],
      'Italy': ['Rome', 'Milan', 'Naples', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Florence', 'Bari', 'Catania'],
      'Spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Zaragoza', 'Málaga', 'Murcia', 'Palma', 'Las Palmas', 'Bilbao'],
      'Japan': ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
      'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Hobart', 'Darwin', 'Newcastle'],
      'Brazil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
      'Canada': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Halifax'],
      'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat', 'Pune', 'Jaipur']
    }
    const countryCities = cities[country]
    return countryCities ? countryCities[Math.floor(Math.random() * countryCities.length)] : 'Unknown'
  }

  const getIcon = (type) => {
    const icons = {
      'Medical': '🏥',
      'Valuable': '💎',
      'Perishable': '🧊',
      'Fragile': '⚠️',
      'Urgent': '🚀',
      'Express': '⚡',
      'Oversized': '📏',
      'Standard': '📦'
    }
    return icons[type] || '📦'
  }

  const getRandomDelay = () => {
    const minSeconds = 30
    const maxSeconds = 180
    return (Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds) * 1000
  }

  const getTimeAgo = () => {
    const times = [
      'just now', '1 min ago', '2 min ago', '3 min ago', '5 min ago', 
      '8 min ago', '10 min ago', '12 min ago', '15 min ago', '18 min ago',
      '20 min ago', '22 min ago', '25 min ago', '28 min ago', '30 min ago',
      '35 min ago', '40 min ago', '45 min ago', '50 min ago', '55 min ago',
      '1 hour ago'
    ]
    return times[Math.floor(Math.random() * times.length)]
  }

  const showNextNotification = () => {
    resetIfNeeded()
    
    const name = getNextName()
    const country = getCountry()
    const city = getCity(country)
    const packageType = getPackageType()

    setCurrentNotification({
      recipient: name,
      city: city,
      country: country,
      packageType: packageType,
      time: getTimeAgo(),
      icon: getIcon(packageType)
    })
    setIsVisible(true)
    setProgress(100)

    // 🎵 Jouer le son à chaque notification
    playNotificationSound()

    setTimeout(() => {
      setIsVisible(false)
    }, 5000)
  }

  useEffect(() => {
    const { usedNames } = getFromLocalStorage()
    if (usedNames.length === 0) {
      const shuffled = shuffleArray(allNames)
      const firstNames = shuffled.slice(0, Math.min(50, allNames.length))
      saveToLocalStorage(firstNames, 0)
    }

    const initialTimeout = setTimeout(() => {
      showNextNotification()
    }, 5000)

    return () => clearTimeout(initialTimeout)
  }, [])

  useEffect(() => {
    if (!isVisible) {
      const delay = getRandomDelay()
      setNextDelay(delay)
      
      timerRef.current = setTimeout(() => {
        showNextNotification()
      }, delay)
      
      return () => clearTimeout(timerRef.current)
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible) {
      setProgress(100)
      const startTime = Date.now()
      const duration = 5000

      const updateProgress = () => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100)
        setProgress(remaining)
        
        if (remaining > 0) {
          progressRef.current = requestAnimationFrame(updateProgress)
        }
      }
      
      progressRef.current = requestAnimationFrame(updateProgress)
      
      return () => {
        if (progressRef.current) {
          cancelAnimationFrame(progressRef.current)
        }
      }
    }
  }, [isVisible])

  if (!currentNotification) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-full">
      <div
        className={`
          bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl 
          border-l-4 border-orange-500 overflow-hidden
          transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0'}
        `}
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-white opacity-50" />
          
          <div className="relative p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-20 animate-pulse" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                    ✅ DELIVERED
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {currentNotification.time}
                  </span>
                </div>
                
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  <span className="text-orange-600 hover:text-orange-700 transition-colors cursor-pointer">
                    {currentNotification.recipient}
                  </span>
                  <span className="text-gray-600"> just received their package</span>
                </p>
                
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                    <MapPin className="w-3 h-3 text-orange-400" />
                    {currentNotification.city}, {currentNotification.country}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                    <Package className="w-3 h-3 text-orange-400" />
                    {currentNotification.packageType}
                  </span>
                  <span className="text-lg leading-none">{currentNotification.icon}</span>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-1 rounded-full">
                  #{getFromLocalStorage().currentIndex + 1}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative h-1 bg-gray-100/80 w-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 rounded-r-full transition-all duration-300 ease-linear"
            style={{ 
              width: `${progress}%`,
              backgroundSize: '200% 100%',
              animation: 'shimmer 2s infinite'
            }}
          />
        </div>
        
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500/5 rounded-full blur-2xl pointer-events-none" />
      </div>
      
      {!isVisible && (
        <div className="mt-2 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-400 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
            Next notification in {Math.round(nextDelay / 1000)}s
          </div>
        </div>
      )}
    </div>
  )
}

export default DeliveryNotifications