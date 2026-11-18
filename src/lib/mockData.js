// EVCharge realistic dataset with full specifications, locations, and high-res imagery

export const initialChargers = [
  {
    id: "ch-101",
    name: "Shell Recharge SuperStation",
    tag: "High Power DC Hub",
    address: "Bandra Kurla Complex, G-Block, Mumbai, MH",
    city: "Mumbai",
    latitude: 19.0657,
    longitude: 72.8687,
    distance: "1.2 km",
    rating: 4.9,
    reviewsCount: 142,
    host: {
      name: "Shell Mobility Network",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      isSuperHost: true,
      joined: "Jan 2024",
      phone: "+91 98201 12345"
    },
    connectors: [
      { type: "CCS2", power: "150 kW", current: "DC", status: "Available", price: 18.5 },
      { type: "CCS2", power: "150 kW", current: "DC", status: "Occupied", price: 18.5 },
      { type: "Type 2", power: "22 kW", current: "AC", status: "Available", price: 11.0 },
      { type: "CHAdeMO", power: "50 kW", current: "DC", status: "Available", price: 16.0 }
    ],
    pricing: {
      perKwh: 18.5,
      currency: "₹",
      idleFeePerMin: 2.0,
      parkingFee: 0.0
    },
    operatingHours: "24/7 Always Open",
    isOpen247: true,
    status: "Available",
    availablePorts: 3,
    totalPorts: 4,
    images: [
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["High-speed Wi-Fi", "Coffee Lounge", "Restrooms", "CCTV 24/7", "Wheelchair Accessible", "EV Maintenance Check"],
    description: "Ultra-fast multi-connector DC hub engineered for luxury and high-capacity EVs. Features covered charging bays, solar canopies, high-speed Wi-Fi, and a temperature-controlled driver lounge with fresh brew coffee.",
    reviews: [
      { id: "r1", user: "Vikram Malhotra", rating: 5, date: "2 days ago", comment: "Blazing fast! Charged my Ioniq 5 from 20% to 80% in just 18 minutes while having coffee." },
      { id: "r2", user: "Priya Nair", rating: 5, date: "1 week ago", comment: "Clean premises, well-lit at night, and the staff helped me guide the cable smoothly. Highly recommend." }
    ]
  },
  {
    id: "ch-102",
    name: "Tata Power EZ Charge - Cyber Gateway",
    tag: "Dual Bay Fast Charger",
    address: "HITEC City, Madhapur, Hyderabad, TS",
    city: "Hyderabad",
    latitude: 17.4474,
    longitude: 78.3762,
    distance: "2.4 km",
    rating: 4.8,
    reviewsCount: 98,
    host: {
      name: "Tata Power EV Ecosystem",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      isSuperHost: true,
      joined: "Mar 2024",
      phone: "+91 99881 22334"
    },
    connectors: [
      { type: "CCS2", power: "60 kW", current: "DC", status: "Available", price: 16.0 },
      { type: "Type 2", power: "22 kW", current: "AC", status: "Available", price: 10.5 }
    ],
    pricing: {
      perKwh: 16.0,
      currency: "₹",
      idleFeePerMin: 1.5,
      parkingFee: 20.0
    },
    operatingHours: "06:00 AM – 11:30 PM",
    isOpen247: false,
    status: "Available",
    availablePorts: 2,
    totalPorts: 2,
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Restrooms", "CCTV 24/7", "Shopping Mall Access", "Covered Parking"],
    description: "Convenient dual-gun fast charger situated in the prime tech corridor. Perfect for topping up during meetings or lunch breaks with seamless app-based plug-and-charge compatibility.",
    reviews: [
      { id: "r3", user: "Arjun Reddy", rating: 5, date: "3 days ago", comment: "Very reliable. Connected directly to my Nexon EV with zero handshake latency." }
    ]
  },
  {
    id: "ch-103",
    name: "Jio-bp pulse Mega Hub",
    tag: "High-Capacity Highway Hub",
    address: "NH 48 Expressway, Sector 29, Gurugram, HR",
    city: "Gurugram",
    latitude: 28.4595,
    longitude: 77.0266,
    distance: "3.8 km",
    rating: 4.7,
    reviewsCount: 215,
    host: {
      name: "Jio-bp pulse",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      isSuperHost: true,
      joined: "Nov 2023",
      phone: "+91 97112 55443"
    },
    connectors: [
      { type: "CCS2", power: "240 kW", current: "DC", status: "Available", price: 19.5 },
      { type: "CCS2", power: "120 kW", current: "DC", status: "Occupied", price: 17.5 },
      { type: "CHAdeMO", power: "50 kW", current: "DC", status: "Available", price: 15.0 },
      { type: "Type 2", power: "22 kW", current: "AC", status: "Available", price: 11.0 }
    ],
    pricing: {
      perKwh: 19.5,
      currency: "₹",
      idleFeePerMin: 3.0,
      parkingFee: 0.0
    },
    operatingHours: "24/7 Always Open",
    isOpen247: true,
    status: "Available",
    availablePorts: 3,
    totalPorts: 4,
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Wild Bean Cafe", "High-speed Wi-Fi", "Restrooms", "Food Court", "Tire Air & Water", "24/7 Security"],
    description: "Premium expressway hub with ultra-fast 240kW liquid-cooled CCS2 dispensers. Ideal for long road trips between Delhi-Jaipur with food court dining and spotless facilities.",
    reviews: [
      { id: "r4", user: "Rohan Khanna", rating: 5, date: "Yesterday", comment: "The 240kW charger is incredible. Sustained 180kW charging rate on my Kia EV6." }
    ]
  },
  {
    id: "ch-104",
    name: "GreenPoint Villa Host - Rahul's Fast Point",
    tag: "Verified Residential Host",
    address: "Indiranagar 12th Main, Bengaluru, KA",
    city: "Bengaluru",
    latitude: 12.9716,
    longitude: 77.6412,
    distance: "0.8 km",
    rating: 4.9,
    reviewsCount: 37,
    host: {
      name: "Rahul Verma",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
      isSuperHost: true,
      joined: "Aug 2024",
      phone: "+91 94481 99887"
    },
    connectors: [
      { type: "Type 2", power: "22 kW", current: "AC", status: "Available", price: 12.0 },
      { type: "Type 1", power: "7.4 kW", current: "AC", status: "Available", price: 9.5 }
    ],
    pricing: {
      perKwh: 12.0,
      currency: "₹",
      idleFeePerMin: 1.0,
      parkingFee: 0.0
    },
    operatingHours: "07:00 AM – 10:00 PM",
    isOpen247: false,
    status: "Available",
    availablePorts: 2,
    totalPorts: 2,
    images: [
      "https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Secure Gated Community", "Dedicated Covered Bay", "CCTV Monitored", "Drinking Water"],
    description: "Quiet, tree-lined residential host charger in prime Indiranagar. Wallbox Pulsar Plus 22kW 3-phase charger with safety interlock. Safe and pleasant neighborhood to recharge while working at nearby cafes.",
    reviews: [
      { id: "r5", user: "Sneha Rao", rating: 5, date: "4 days ago", comment: "Rahul was very hospitable and made sure my car was plugged in securely. Will definitely book again!" }
    ]
  },
  {
    id: "ch-105",
    name: "Ather Grid Station - Koramangala",
    tag: "Urban 2W & 4W Fast Point",
    address: "80 Feet Road, 4th Block, Koramangala, Bengaluru, KA",
    city: "Bengaluru",
    latitude: 12.9352,
    longitude: 77.6245,
    distance: "1.9 km",
    rating: 4.6,
    reviewsCount: 84,
    host: {
      name: "Ather Energy & Partners",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      isSuperHost: false,
      joined: "May 2024",
      phone: "+91 80491 33221"
    },
    connectors: [
      { type: "Type 2", power: "22 kW", current: "AC", status: "Occupied", price: 11.5 },
      { type: "CCS2", power: "50 kW", current: "DC", status: "Available", price: 15.5 }
    ],
    pricing: {
      perKwh: 15.5,
      currency: "₹",
      idleFeePerMin: 1.5,
      parkingFee: 10.0
    },
    operatingHours: "24/7 Always Open",
    isOpen247: true,
    status: "Available",
    availablePorts: 1,
    totalPorts: 2,
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Cafe Nearby", "CCTV 24/7", "Street Parking Access"],
    description: "Centrally located in Koramangala's food street. Fast charging with real-time slot booking so you never have to wait in line.",
    reviews: [
      { id: "r6", user: "Karthik Sundaram", rating: 4, date: "1 week ago", comment: "Great location right opposite cafes. One slot was busy but the other worked flawlessly." }
    ]
  },
  {
    id: "ch-106",
    name: "Volttic Green Plaza Station",
    tag: "Commercial Office Park Hub",
    address: "Worldmark 1, Aerocity, New Delhi, DL",
    city: "New Delhi",
    latitude: 28.5503,
    longitude: 77.1215,
    distance: "2.1 km",
    rating: 4.8,
    reviewsCount: 167,
    host: {
      name: "Aerocity Smart Infra",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
      isSuperHost: true,
      joined: "Jan 2024",
      phone: "+91 11492 88776"
    },
    connectors: [
      { type: "CCS2", power: "180 kW", current: "DC", status: "Available", price: 19.0 },
      { type: "CCS2", power: "60 kW", current: "DC", status: "Available", price: 16.5 },
      { type: "Type 2", power: "22 kW", current: "AC", status: "Occupied", price: 11.0 }
    ],
    pricing: {
      perKwh: 19.0,
      currency: "₹",
      idleFeePerMin: 2.5,
      parkingFee: 0.0
    },
    operatingHours: "24/7 Always Open",
    isOpen247: true,
    status: "Available",
    availablePorts: 2,
    totalPorts: 3,
    images: [
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Airport Shuttle Access", "5-Star Dining", "Valet Assistance", "Restrooms", "Free Wi-Fi", "CCTV 24/7"],
    description: "Premium airport corridor charging lounge at Aerocity Worldmark. High-wattage fast charging for corporate and long-distance travelers with VIP hospitality amenities.",
    reviews: [
      { id: "r7", user: "Ananya Sen", rating: 5, date: "3 days ago", comment: "Super convenient when heading to IGI Terminal 3. 25 minutes gives me full charge." }
    ]
  }
];

export const initialVehicles = [
  {
    id: "veh-1",
    make: "Tesla",
    model: "Model X Long Range",
    year: 2024,
    batteryCapacity: 100, // kWh
    currentBattery: 80, // %
    range: "340 miles",
    temp: "75.2°F",
    batteryStatus: "Good",
    connectorType: "CCS2",
    plate: "MH 02 EV 9901",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "veh-2",
    make: "Tata",
    model: "Nexon EV Max",
    year: 2024,
    batteryCapacity: 40.5,
    currentBattery: 58,
    range: "120 miles",
    temp: "78.0°F",
    batteryStatus: "Good",
    connectorType: "CCS2",
    plate: "DL 01 EV 4455",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "veh-3",
    make: "Hyundai",
    model: "Ioniq 5 Electric",
    year: 2024,
    batteryCapacity: 72.6,
    currentBattery: 42,
    range: "185 miles",
    temp: "74.5°F",
    batteryStatus: "Excellent",
    connectorType: "CCS2",
    plate: "KA 05 EV 1234",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80"
  }
];

export const initialWalletTransactions = [
  {
    id: "tx-9821",
    type: "charge",
    title: "Shell Recharge SuperStation",
    date: "Today, 10:45 AM",
    amount: -540.00,
    kwh: 29.2,
    currency: "₹",
    status: "Completed",
    method: "EVCharge Wallet",
    bookingId: "BK-88219"
  },
  {
    id: "tx-9820",
    type: "topup",
    title: "Wallet Top-up via UPI",
    date: "Yesterday, 04:30 PM",
    amount: 2000.00,
    currency: "₹",
    status: "Completed",
    method: "UPI (Google Pay)",
    reference: "UPI/4281982749"
  },
  {
    id: "tx-9819",
    type: "charge",
    title: "Tata Power EZ Charge",
    date: "14 Nov 2026, 06:15 PM",
    amount: -368.00,
    kwh: 23.0,
    currency: "₹",
    status: "Completed",
    method: "EVCharge Wallet",
    bookingId: "BK-87910"
  },
  {
    id: "tx-9818",
    type: "refund",
    title: "Booking Cancellation Refund",
    date: "10 Nov 2026, 01:20 PM",
    amount: 450.00,
    currency: "₹",
    status: "Completed",
    method: "Refund to Wallet",
    bookingId: "BK-87302"
  },
  {
    id: "tx-9817",
    type: "charge",
    title: "Jio-bp pulse Mega Hub",
    date: "06 Nov 2026, 09:12 AM",
    amount: -682.50,
    kwh: 35.0,
    currency: "₹",
    status: "Completed",
    method: "Debit Card (HDFC)",
    bookingId: "BK-86411"
  }
];

export const initialBookings = [
  {
    id: "BK-88219",
    chargerId: "ch-101",
    chargerName: "Shell Recharge SuperStation",
    location: "Bandra Kurla Complex, Mumbai",
    connectorType: "CCS2 (150 kW)",
    vehicle: "Tesla Model X Long Range",
    plate: "MH 02 EV 9901",
    date: "2026-11-18",
    timeSlot: "10:30 AM - 11:30 AM",
    durationMinutes: 60,
    estimatedKwh: 35.0,
    cost: 540.00,
    paymentMethod: "EVCharge Wallet",
    status: "Confirmed",
    qrCode: "EVCHARGE-BK88219-SHELL-MUM"
  },
  {
    id: "BK-87910",
    chargerId: "ch-102",
    chargerName: "Tata Power EZ Charge",
    location: "HITEC City, Hyderabad",
    connectorType: "CCS2 (60 kW)",
    vehicle: "Tata Nexon EV Max",
    plate: "DL 01 EV 4455",
    date: "2026-11-14",
    timeSlot: "06:00 PM - 07:00 PM",
    durationMinutes: 60,
    estimatedKwh: 23.0,
    cost: 368.00,
    paymentMethod: "EVCharge Wallet",
    status: "Completed",
    qrCode: "EVCHARGE-BK87910-TATA-HYD"
  }
];

