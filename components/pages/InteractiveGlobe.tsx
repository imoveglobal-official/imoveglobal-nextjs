'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

interface Country {
  id: string
  name: string
  lat: number
  lng: number
  flag: string
  universities: string
  students: string
  topPrograms: string[]
  description: string
}

// Country data with coordinates and details
const countriesData: Country[] = [
  {
    id: 'usa',
    name: 'United States',
    lat: 37.0902,
    lng: -95.7129,
    flag: '🇺🇸',
    universities: '4,500+',
    students: '1M+ International',
    topPrograms: ['Business', 'Engineering', 'Computer Science'],
    description: 'World-leading universities with cutting-edge research and diverse campus life.'
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    lat: 55.3781,
    lng: -3.4360,
    flag: '🇬🇧',
    universities: '160+',
    students: '600K+ International',
    topPrograms: ['Law', 'Medicine', 'Finance'],
    description: 'Historic institutions offering world-class education and global recognition.'
  },
  {
    id: 'canada',
    name: 'Canada',
    lat: 56.1304,
    lng: -106.3468,
    flag: '🇨🇦',
    universities: '100+',
    students: '800K+ International',
    topPrograms: ['Technology', 'Healthcare', 'Environmental Science'],
    description: 'Welcoming multicultural environment with excellent post-study work options.'
  },
  {
    id: 'australia',
    name: 'Australia',
    lat: -25.2744,
    lng: 133.7751,
    flag: '🇦🇺',
    universities: '43',
    students: '750K+ International',
    topPrograms: ['Marine Biology', 'Mining Engineering', 'Tourism'],
    description: 'High quality of life with innovative teaching methods and research opportunities.'
  },
  {
    id: 'germany',
    name: 'Germany',
    lat: 51.1657,
    lng: 10.4515,
    flag: '🇩🇪',
    universities: '400+',
    students: '400K+ International',
    topPrograms: ['Engineering', 'Automotive', 'Research'],
    description: 'Tuition-free education at public universities with strong industry connections.'
  },
  {
    id: 'france',
    name: 'France',
    lat: 46.2276,
    lng: 2.2137,
    flag: '🇫🇷',
    universities: '250+',
    students: '350K+ International',
    topPrograms: ['Arts', 'Fashion', 'Culinary Arts'],
    description: 'Rich cultural heritage combined with excellent academic programs.'
  },
  {
    id: 'japan',
    name: 'Japan',
    lat: 36.2048,
    lng: 138.2529,
    flag: '🇯🇵',
    universities: '780+',
    students: '300K+ International',
    topPrograms: ['Technology', 'Robotics', 'Animation'],
    description: 'Cutting-edge technology education in a unique cultural setting.'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    lat: 1.3521,
    lng: 103.8198,
    flag: '🇸🇬',
    universities: '34',
    students: '75K+ International',
    topPrograms: ['Business', 'Finance', 'Biotechnology'],
    description: 'Global education hub with world-ranked universities and career opportunities.'
  },
  {
    id: 'india',
    name: 'India',
    lat: 20.5937,
    lng: 78.9629,
    flag: '🇮🇳',
    universities: '1,000+',
    students: 'Growing Hub',
    topPrograms: ['IT', 'Medicine', 'Management'],
    description: 'Rapidly growing education sector with affordable quality programs.'
  },
  {
    id: 'uae',
    name: 'UAE',
    lat: 23.4241,
    lng: 53.8478,
    flag: '🇦🇪',
    universities: '70+',
    students: '100K+ International',
    topPrograms: ['Business', 'Aviation', 'Hospitality'],
    description: 'Modern campuses with international branch universities and tax-free earnings.'
  },
  {
    id: 'china',
    name: 'China',
    lat: 32.8617,
    lng: 100.1954,
    flag: '🇨🇳',
    universities: '2,900+',
    students: '500K+ International',
    topPrograms: ['Engineering', 'Business', 'Traditional Medicine'],
    description: 'Ancient culture meets modern innovation with scholarship opportunities.'
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    lat: 35.9078,
    lng: 127.7669,
    flag: '🇰🇷',
    universities: '190+',
    students: '150K+ International',
    topPrograms: ['Technology', 'K-Culture', 'Engineering'],
    description: 'Tech-savvy education system with generous scholarships and vibrant culture.'
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    lat: 52.1326,
    lng: 5.2913,
    flag: '🇳🇱',
    universities: '75+',
    students: '120K+ International',
    topPrograms: ['International Business', 'Water Management', 'Agriculture'],
    description: 'Progressive education in English with cycling-friendly cities and liberal culture.'
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    lat: 46.8182,
    lng: 8.2275,
    flag: '🇨🇭',
    universities: '12',
    students: '50K+ International',
    topPrograms: ['Hospitality', 'Banking', 'Research'],
    description: 'World-class research universities in a stunning alpine setting.'
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
    lat: -40.9006,
    lng: 174.8860,
    flag: '🇳🇿',
    universities: '8',
    students: '100K+ International',
    topPrograms: ['Environmental Science', 'Agriculture', 'Film'],
    description: 'Beautiful landscapes with high-quality education and work opportunities.'
  },
  {
    id: 'ireland',
    name: 'Ireland',
    lat: 53.4129,
    lng: -8.2439,
    flag: '🇮🇪',
    universities: '35+',
    students: '35K+ International',
    topPrograms: ['Technology', 'Pharmaceuticals', 'Literature'],
    description: 'Friendly English-speaking nation with strong tech industry presence.'
  },
  {
    id: 'sweden',
    name: 'Sweden',
    lat: 60.1282,
    lng: 18.6435,
    flag: '🇸🇪',
    universities: '50+',
    students: '40K+ International',
    topPrograms: ['Sustainability', 'Innovation', 'Design'],
    description: 'Innovative education system with focus on sustainability and equality.'
  },
  {
    id: 'italy',
    name: 'Italy',
    lat: 41.8719,
    lng: 12.5674,
    flag: '🇮🇹',
    universities: '90+',
    students: '100K+ International',
    topPrograms: ['Architecture', 'Fashion Design', 'Culinary Arts'],
    description: 'Historic universities with rich cultural heritage and artistic excellence.'
  },
  {
    id: 'spain',
    name: 'Spain',
    lat: 40.4637,
    lng: -3.7492,
    flag: '🇪🇸',
    universities: '80+',
    students: '80K+ International',
    topPrograms: ['Business', 'Tourism', 'Language Studies'],
    description: 'Vibrant culture and affordable living with excellent business schools.'
  },
  {
    id: 'brazil',
    name: 'Brazil',
    lat: -14.2350,
    lng: -51.9253,
    flag: '🇧🇷',
    universities: '200+',
    students: '20K+ International',
    topPrograms: ['Environmental Studies', 'Agriculture', 'Sports Science'],
    description: 'Emerging education hub with diverse ecosystems and growing economy.'
  },
  {
    id: 'russia',
    name: 'Russia',
    lat: 61.5240,
    lng: 105.3188,
    flag: '🇷🇺',
    universities: '750+',
    students: '300K+ International',
    topPrograms: ['Engineering', 'Medicine', 'Space Science'],
    description: 'Strong academic tradition with affordable tuition and diverse program offerings.'
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    lat: -30.5595,
    lng: 22.9375,
    flag: '🇿🇦',
    universities: '26',
    students: '50K+ International',
    topPrograms: ['Mining', 'Wildlife Conservation', 'Business'],
    description: 'Diverse cultural experience with English-taught programs and stunning landscapes.'
  },
  {
    id: 'egypt',
    name: 'Egypt',
    lat: 26.8206,
    lng: 30.8025,
    flag: '🇪🇬',
    universities: '50+',
    students: '30K+ International',
    topPrograms: ['Archaeology', 'Medicine', 'Engineering'],
    description: 'Ancient civilization with modern universities and affordable education.'
  },
  {
    id: 'mexico',
    name: 'Mexico',
    lat: 23.6345,
    lng: -102.5528,
    flag: '🇲🇽',
    universities: '150+',
    students: '25K+ International',
    topPrograms: ['Spanish Language', 'International Relations', 'Arts'],
    description: 'Rich culture with affordable living and growing international programs.'
  },
  {
    id: 'argentina',
    name: 'Argentina',
    lat: -38.4161,
    lng: -63.6167,
    flag: '🇦🇷',
    universities: '100+',
    students: '15K+ International',
    topPrograms: ['Medicine', 'Agriculture', 'Tango & Arts'],
    description: 'European-style education in South America with low tuition costs.'
  },
  {
    id: 'turkey',
    name: 'Turkey',
    lat: 38.9637,
    lng: 35.2433,
    flag: '🇹🇷',
    universities: '200+',
    students: '150K+ International',
    topPrograms: ['Medicine', 'Engineering', 'History'],
    description: 'Bridge between Europe and Asia with affordable, quality education.'
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    lat: 23.8859,
    lng: 45.0792,
    flag: '🇸🇦',
    universities: '30+',
    students: '40K+ International',
    topPrograms: ['Petroleum Engineering', 'Islamic Studies', 'Business'],
    description: 'Modern universities with generous scholarships and growing internationalization.'
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    lat: 4.2105,
    lng: 101.9758,
    flag: '🇲🇾',
    universities: '70+',
    students: '130K+ International',
    topPrograms: ['Engineering', 'Business', 'IT'],
    description: 'Affordable education hub with diverse culture and English-taught programs.'
  },
  {
    id: 'thailand',
    name: 'Thailand',
    lat: 15.8700,
    lng: 100.9925,
    flag: '🇹🇭',
    universities: '150+',
    students: '30K+ International',
    topPrograms: ['Hospitality', 'International Relations', 'Medicine'],
    description: 'Beautiful country with affordable living and growing international programs.'
  },
  {
    id: 'norway',
    name: 'Norway',
    lat: 60.4720,
    lng: 8.4689,
    flag: '🇳🇴',
    universities: '40+',
    students: '20K+ International',
    topPrograms: ['Marine Sciences', 'Energy', 'Sustainability'],
    description: 'High quality of life with tuition-free education at public universities.'
  },
  {
    id: 'denmark',
    name: 'Denmark',
    lat: 56.2639,
    lng: 9.5018,
    flag: '🇩🇰',
    universities: '30+',
    students: '35K+ International',
    topPrograms: ['Design', 'Renewable Energy', 'Social Sciences'],
    description: 'Innovative education system with focus on sustainability and happiness.'
  },
  {
    id: 'poland',
    name: 'Poland',
    lat: 51.9194,
    lng: 19.1451,
    flag: '🇵🇱',
    universities: '130+',
    students: '80K+ International',
    topPrograms: ['Medicine', 'Engineering', 'Business'],
    description: 'Affordable European education with English-taught programs and rich history.'
  },
  {
    id: 'portugal',
    name: 'Portugal',
    lat: 39.3999,
    lng: -8.2245,
    flag: '🇵🇹',
    universities: '50+',
    students: '60K+ International',
    topPrograms: ['Tourism', 'Marine Biology', 'Business'],
    description: 'Beautiful coastline with affordable living and welcoming culture.'
  },
  {
    id: 'chile',
    name: 'Chile',
    lat: -35.6751,
    lng: -71.5430,
    flag: '🇨🇱',
    universities: '60+',
    students: '12K+ International',
    topPrograms: ['Astronomy', 'Mining', 'Wine Studies'],
    description: 'Stable economy with strong education system and stunning natural landscapes.'
  },
  {
    id: 'colombia',
    name: 'Colombia',
    lat: 4.5709,
    lng: -74.2973,
    flag: '🇨🇴',
    universities: '80+',
    students: '10K+ International',
    topPrograms: ['Coffee Studies', 'Music', 'Business'],
    description: 'Vibrant culture with improving education infrastructure and affordability.'
  },
  {
    id: 'morocco',
    name: 'Morocco',
    lat: 31.7917,
    lng: -7.0926,
    flag: '🇲🇦',
    universities: '40+',
    students: '15K+ International',
    topPrograms: ['Arabic Studies', 'International Business', 'Tourism'],
    description: 'Gateway to Africa with French and English programs and rich cultural heritage.'
  },
  {
    id: 'kenya',
    name: 'Kenya',
    lat: -0.0236,
    lng: 37.9062,
    flag: '🇰🇪',
    universities: '50+',
    students: '20K+ International',
    topPrograms: ['Wildlife Conservation', 'Agriculture', 'Tourism'],
    description: 'Growing education hub in East Africa with English-taught programs.'
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    lat: 14.0583,
    lng: 108.2772,
    flag: '🇻🇳',
    universities: '235+',
    students: '8K+ International',
    topPrograms: ['Business', 'Technology', 'Language Studies'],
    description: 'Emerging education market with affordable costs and dynamic culture.'
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
    lat: -0.7893,
    lng: 113.9213,
    flag: '🇮🇩',
    universities: '120+',
    students: '10K+ International',
    topPrograms: ['Islamic Studies', 'Tourism', 'Engineering'],
    description: 'Largest archipelago with diverse culture and growing international programs.'
  },
  {
    id: 'austria',
    name: 'Austria',
    lat: 47.5162,
    lng: 14.5501,
    flag: '🇦🇹',
    universities: '70+',
    students: '90K+ International',
    topPrograms: ['Music', 'Medicine', 'Engineering'],
    description: 'Historic academic tradition with low tuition and beautiful alpine setting.'
  },
  {
    id: 'iran',
    name: 'Iran',
    lat: 32.4279,
    lng: 53.6880,
    flag: '🇦🇮',
    universities: '70+',
    students: '90K+ International',
    topPrograms: ['Music', 'Medicine', 'Engineering'],
    description: 'Historic academic tradition with low tuition and beautiful alpine setting.'
  },

]

const InteractiveGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const globeRef = useRef<THREE.Mesh | null>(null)
  const markersRef = useRef<THREE.Mesh[]>([])
  const raycasterRef = useRef(new THREE.Raycaster())
  const mouseRef = useRef(new THREE.Vector2())
  const animationRef = useRef<number | null>(null)
  const isRotatingRef = useRef(true)

  // Drag state refs
  const isDraggingRef = useRef(false)
  const previousMousePositionRef = useRef({ x: 0, y: 0 })

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  // value intentionally unused (kept for parity with source runtime behavior)
  const [, setIsHovering] = useState(false)
  const [hoveredCountry, setHoveredCountry] = useState<Country | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Convert lat/lng to 3D coordinates
  const latLngToVector3 = useCallback((lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)

    const x = -(radius * Math.sin(phi) * Math.cos(theta))
    const y = radius * Math.cos(phi)
    const z = radius * Math.sin(phi) * Math.sin(theta)

    return new THREE.Vector3(x, y, z)
  }, [])

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return

    // Clear any existing canvas
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    markersRef.current = []

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
    camera.position.z = 4
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer


    // Create globe with enhanced shader
    const globeGeometry = new THREE.SphereGeometry(1.5, 64, 64)

    const globeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          // Professional Premium Color Palette - Deep Navy & Elegant Teal
          vec3 deepNavy = vec3(0.02, 0.05, 0.12);
          vec3 richBlue = vec3(0.04, 0.12, 0.24);
          vec3 elegantTeal = vec3(0.08, 0.35, 0.45);
          vec3 softCyan = vec3(0.15, 0.48, 0.58);

          // Refined Fresnel for subtle edge glow
          float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);

          // Smooth, elegant wave patterns
          float wave1 = sin(vPosition.y * 3.5 + time * 0.25) * 0.5 + 0.5;
          float wave2 = sin(vPosition.x * 2.8 - time * 0.35) * 0.5 + 0.5;
          float wave3 = sin(vPosition.z * 4.2 + time * 0.18) * 0.5 + 0.5;

          // Smooth wave combination
          float combinedWave = (wave1 + wave2 + wave3) / 3.0;
          combinedWave = smoothstep(0.3, 0.7, combinedWave);

          // Sophisticated energy flow
          float energy = sin(vPosition.y * 6.0 + vPosition.x * 4.5 + time * 0.4) * 0.5 + 0.5;
          energy = smoothstep(0.35, 0.65, energy);

          // Premium color mixing
          vec3 baseColor = mix(deepNavy, richBlue, combinedWave * 0.7);
          vec3 energyColor = mix(baseColor, elegantTeal, energy * 0.18);
          vec3 finalColor = mix(energyColor, softCyan, fresnel * 0.25);

          // Refined subtle glow
          finalColor += vec3(0.05, 0.12, 0.18) * fresnel * 0.6;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: true,
    })

    const globe = new THREE.Mesh(globeGeometry, globeMaterial)
    globe.rotation.x = 0.2 // Slight downward tilt for better perspective
    scene.add(globe)
    globeRef.current = globe

    // World Map Overlay (Direct Texture Integration for High Reliability)
    const mapLoader = new THREE.TextureLoader()
    mapLoader.setCrossOrigin('anonymous')
    // High-resolution map used as alpha mask for glowing continents
    const worldMapTex = mapLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg')

    const mapGeometry = new THREE.SphereGeometry(1.52, 64, 64)
    const mapMaterial = new THREE.MeshBasicMaterial({
      color: 0x2d7a8f,
      alphaMap: worldMapTex,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      depthWrite: false
    })

    // Ensure texture is oriented correctly for standard sphere mapping
    worldMapTex.wrapS = THREE.ClampToEdgeWrapping
    worldMapTex.wrapT = THREE.ClampToEdgeWrapping

    const worldMap = new THREE.Mesh(mapGeometry, mapMaterial)
    globe.add(worldMap)

    // Add elegant grid lines - latitude lines
    const createLatitudeLines = () => {
      const group = new THREE.Group()
      const segments = 64

      for (let lat = -80; lat <= 80; lat += 20) {
        const phi = (90 - lat) * (Math.PI / 180)
        const radius = 1.501 * Math.sin(phi)
        const y = 1.501 * Math.cos(phi)

        const curve = new THREE.EllipseCurve(
          0, 0,
          radius, radius,
          0, 2 * Math.PI,
          false,
          0
        )

        const points = curve.getPoints(segments)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
          color: 0x1e5d6f, // Refined teal-blue
          transparent: true,
          opacity: 0.12,
        })

        const line = new THREE.Line(geometry, material)
        line.rotation.x = Math.PI / 2
        line.position.y = y
        group.add(line)
      }
      return group
    }

    // Add longitude lines
    const createLongitudeLines = () => {
      const group = new THREE.Group()

      for (let lng = 0; lng < 180; lng += 15) {
        const points = []
        for (let lat = -90; lat <= 90; lat += 2) {
          const phi = (90 - lat) * (Math.PI / 180)
          const theta = lng * (Math.PI / 180)

          const x = 1.501 * Math.sin(phi) * Math.cos(theta)
          const y = 1.501 * Math.cos(phi)
          const z = 1.501 * Math.sin(phi) * Math.sin(theta)

          points.push(new THREE.Vector3(x, y, z))
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({
          color: 0x164e5a, // Deep teal
          transparent: true,
          opacity: 0.10,
        })

        const line = new THREE.Line(geometry, material)
        group.add(line)
      }
      return group
    }

    const latLines = createLatitudeLines()
    const lngLines = createLongitudeLines()
    globe.add(latLines)
    globe.add(lngLines)

    // Add subtle particle field
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1000
    const positions = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      const radius = 1.52 + Math.random() * 0.3

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x3d8a9c, // Elegant cyan-teal
      size: 0.010,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    globe.add(particles)

    // Add enhanced multi-layer atmosphere glow
    const atmosphereGeometry1 = new THREE.SphereGeometry(1.62, 64, 64)
    const atmosphereMaterial1 = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
          gl_FragColor = vec4(0.08, 0.35, 0.52, 1.0) * intensity * 0.8;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })
    const atmosphere1 = new THREE.Mesh(atmosphereGeometry1, atmosphereMaterial1)
    scene.add(atmosphere1)

    // Second atmosphere layer for extra glow
    const atmosphereGeometry2 = new THREE.SphereGeometry(1.75, 64, 64)
    const atmosphereMaterial2 = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.40 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          gl_FragColor = vec4(0.12, 0.45, 0.62, 1.0) * intensity * 0.4;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })
    const atmosphere2 = new THREE.Mesh(atmosphereGeometry2, atmosphereMaterial2)
    scene.add(atmosphere2)


    // Add country markers
    const markerGroup = new THREE.Group()
    globe.add(markerGroup)

    countriesData.forEach((country) => {
      const position = latLngToVector3(country.lat, country.lng, 1.52)

      // Marker point with glow
      const markerGeometry = new THREE.SphereGeometry(0.035, 16, 16)
      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xe8b44f, // Refined elegant gold
      })
      const marker = new THREE.Mesh(markerGeometry, markerMaterial)
      marker.position.copy(position)
      marker.userData = country
      markerGroup.add(marker)
      markersRef.current.push(marker)

      // Inner glow sphere
      const glowGeometry = new THREE.SphereGeometry(0.05, 16, 16)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff, // White glow
        transparent: true,
        opacity: 0.4,
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      glow.position.copy(position)
      markerGroup.add(glow)

      // Animated pulse ring
      const ringGeometry = new THREE.RingGeometry(0.05, 0.08, 32)
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xdaa520, // Sophisticated gold
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      })
      const ring = new THREE.Mesh(ringGeometry, ringMaterial)
      ring.position.copy(position)
      ring.lookAt(new THREE.Vector3(0, 0, 0))
      markerGroup.add(ring)

      // Outer pulse ring
      const ring2Geometry = new THREE.RingGeometry(0.08, 0.11, 32)
      const ring2Material = new THREE.MeshBasicMaterial({
        color: 0xe8b44f, // Elegant gold
        transparent: true,
        opacity: 0.38,
        side: THREE.DoubleSide,
      })
      const ring2 = new THREE.Mesh(ring2Geometry, ring2Material)
      ring2.position.copy(position)
      ring2.lookAt(new THREE.Vector3(0, 0, 0))
      markerGroup.add(ring2)

      // Animate pulses with glow
      const animatePulse = () => {
        const time = Date.now() * 0.003 + country.lat
        const pulse = Math.sin(time) * 0.5 + 0.5

        ring.scale.setScalar(1 + pulse * 0.4)
        ringMaterial.opacity = 0.7 - pulse * 0.4

        ring2.scale.setScalar(1 + pulse * 0.6)
        ring2Material.opacity = 0.5 - pulse * 0.35

        glow.scale.setScalar(1 + pulse * 0.3)
        glowMaterial.opacity = 0.4 + pulse * 0.2
      }
      ring.onBeforeRender = animatePulse
      ring2.onBeforeRender = animatePulse
      glow.onBeforeRender = animatePulse
    })

    // Professional Lighting - Elegant and Balanced
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight1.position.set(5, 3, 5)
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0x7c3aed, 0.35)
    directionalLight2.position.set(-5, -3, -5)
    scene.add(directionalLight2)

    const pointLight1 = new THREE.PointLight(0x2d7a8f, 1.0, 15)
    pointLight1.position.set(-3, 2, 4)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x3d8a9c, 0.75, 12)
    pointLight2.position.set(3, -2, -4)
    scene.add(pointLight2)

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate)

      if (isRotatingRef.current && globeRef.current) {
        globeRef.current.rotation.y += 0.002

        // Slowly rotate particles in opposite direction for depth
        const particlesObj = globeRef.current.children.find(
          child => child instanceof THREE.Points
        )
        if (particlesObj) {
          particlesObj.rotation.y -= 0.001
          particlesObj.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1
        }
      }


      // Update shader time uniforms
      const globeMat = globeRef.current?.material as THREE.ShaderMaterial | undefined
      if (globeRef.current && globeMat && globeMat.uniforms) {
        globeMat.uniforms.time.value += 0.015
      }
      const worldMapMat = worldMap.material as unknown as THREE.ShaderMaterial
      if (worldMap && worldMap.material && worldMapMat.uniforms) {
        worldMapMat.uniforms.time.value += 0.015
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight

      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      if (renderer && container) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [latLngToVector3])

  // Handle mouse interactions
  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (!containerRef.current || selectedCountry) return

    isDraggingRef.current = true
    setIsDragging(true)
    isRotatingRef.current = false
    previousMousePositionRef.current = {
      x: event.clientX,
      y: event.clientY
    }
  }, [selectedCountry])

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    // Handle dragging to rotate globe
    if (isDraggingRef.current && globeRef.current) {
      const deltaX = event.clientX - previousMousePositionRef.current.x
      const deltaY = event.clientY - previousMousePositionRef.current.y

      globeRef.current.rotation.y += deltaX * 0.005
      globeRef.current.rotation.x += deltaY * 0.005

      // Limit vertical rotation
      globeRef.current.rotation.x = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, globeRef.current.rotation.x))

      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      }
      return
    }

    // Check for marker hover
    if (!cameraRef.current) return
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
    const intersects = raycasterRef.current.intersectObjects(markersRef.current)

    if (intersects.length > 0) {
      const country = intersects[0].object.userData as Country
      setHoveredCountry(country)
      setIsHovering(true)
      isRotatingRef.current = false
      document.body.style.cursor = 'pointer'
    } else {
      setHoveredCountry(null)
      setIsHovering(false)
      if (!selectedCountry && !isDraggingRef.current) {
        isRotatingRef.current = true
      }
      document.body.style.cursor = isDraggingRef.current ? 'grabbing' : 'grab'
    }
  }, [selectedCountry])

  const handleMouseUp = useCallback(() => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false
      setIsDragging(false)
      if (!selectedCountry && !hoveredCountry) {
        isRotatingRef.current = true
      }
    }
  }, [selectedCountry, hoveredCountry])

  const handleMouseLeave = useCallback(() => {
    isDraggingRef.current = false
    setIsDragging(false)
    document.body.style.cursor = 'default'
  }, [])

  const handleClick = useCallback((event: React.MouseEvent) => {
    if (!containerRef.current) return

    // Don't trigger click if we were dragging
    if (isDragging) return

    const rect = containerRef.current.getBoundingClientRect()
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    if (!cameraRef.current) return
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
    const intersects = raycasterRef.current.intersectObjects(markersRef.current)

    if (intersects.length > 0) {
      const country = intersects[0].object.userData as Country
      setSelectedCountry(country)
      isRotatingRef.current = false
    } else {
      setSelectedCountry(null)
      isRotatingRef.current = true
    }
  }, [isDragging])

  const closeDetails = useCallback(() => {
    setSelectedCountry(null)
    isRotatingRef.current = true
  }, [])

  return (
    <div className="relative w-full h-full min-h-[350px] sm:min-h-[450px] lg:min-h-[650px]">
      {/* Globe Container */}
      <div
        ref={containerRef}
        className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      // style={{ minHeight: '100%' }}
      />

      {/* Hover Tooltip */}
      {hoveredCountry && !selectedCountry && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl backdrop-blur-lg animate-fadeIn"
          style={{
            background: 'rgba(10, 20, 32, 0.9)',
            border: '1px solid rgba(14, 165, 233, 0.3)'
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{hoveredCountry.flag}</span>
            <span className="text-white font-medium">{hoveredCountry.name}</span>
          </div>
          <p className="text-gray-10 text-xs mt-1">Click to view details</p>
        </div>
      )}

      {/* Country Details Panel */}
      {selectedCountry && (
        <div
          className="absolute inset-0 flex items-center justify-center p-4 animate-fadeIn"
          style={{ background: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div
            className="relative max-w-sm w-full rounded-2xl p-6 backdrop-blur-xl animate-scaleIn"
            style={{
              background: 'linear-gradient(135deg, rgba(10, 20, 32, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(14, 165, 233, 0.25)'
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeDetails}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Country Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl">{selectedCountry.flag}</div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedCountry.name}</h3>
                <p className="text-gray-10 text-sm">{selectedCountry.universities} Universities</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-gray-10 text-xs mb-1">International Students</p>
                <p className="text-white font-semibold">{selectedCountry.students}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-gray-10 text-xs mb-1">Universities</p>
                <p className="text-white font-semibold">{selectedCountry.universities}</p>
              </div>
            </div>

            {/* Top Programs */}
            <div className="mb-6">
              <p className="text-gray-10 text-xs mb-2">Top Programs</p>
              <div className="flex flex-wrap gap-2">
                {selectedCountry.topPrograms.map((program, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                      color: '#0ea5e9'
                    }}
                  >
                    {program}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              {selectedCountry.description}
            </p>

            {/* CTA Button */}
            <button
              className="w-full py-3 rounded-xl font-medium text-white transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                boxShadow: '0 10px 30px -10px rgba(2, 132, 199, 0.5)'
              }}
            >
              Explore Universities →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default InteractiveGlobe
