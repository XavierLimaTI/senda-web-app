export interface Therapy {
  id: string
  name: {
    pt: string
    en: string
    es: string
    zh: string
  }
  category: 'body' | 'energy' | 'mind' | 'nature' | 'shamanic'
  description: {
    pt: string
    en: string
    es: string
    zh: string
  }
  indications: {
    pt: string[]
    en: string[]
    es: string[]
    zh: string[]
  }
  indicationTags: string[]
  contraindications: {
    pt: string[]
    en: string[]
    es: string[]
    zh: string[]
  }
  modality: 'presencial' | 'online' | 'presencial_online'
  image: string
}

export const therapies: Therapy[] = [
  {
    id: 'massagem-relaxante',
    name: { pt: 'Massagem Relaxante / Terapêutica', en: 'Relaxing / Therapeutic Massage', es: 'Masaje Relajante / Terapéutico', zh: '放松/治疗按摩' },
    category: 'body',
    description: {
      pt: 'Técnicas clássicas de massagem que utilizam movimentos suaves, pressão controlada e manipulação dos tecidos moles para aliviar tensão muscular, melhorar a circulação sanguínea, promover relaxamento profundo e restaurar o equilíbrio corporal.',
      en: 'Classic massage techniques using smooth movements, controlled pressure and soft tissue manipulation to relieve muscle tension, improve blood circulation, promote deep relaxation and restore body balance.',
      es: 'Técnicas clásicas de masaje que utilizan movimientos suaves, presión controlada y manipulación de tejidos blandos para aliviar la tensión muscular, mejorar la circulación sanguínea, promover la relajación profunda y restaurar el equilibrio corporal.',
      zh: '经典按摩技术，使用平缓的动作、受控的压力和软组织操纵来缓解肌肉张力、改善血液循环、促进深层放松和恢复身体平衡。'
    },
    indications: {
      pt: ['Tensão muscular e rigidez', 'Dores nas costas e pescoço', 'Estresse e ansiedade', 'Insônia', 'Má circulação', 'Fadiga', 'Recuperação pós-exercício'],
      en: ['Muscle tension and stiffness', 'Back and neck pain', 'Stress and anxiety', 'Insomnia', 'Poor circulation', 'Fatigue', 'Post-exercise recovery'],
      es: ['Tensión y rigidez muscular', 'Dolor de espalda y cuello', 'Estrés y ansiedad', 'Insomnio', 'Mala circulación', 'Fatiga', 'Recuperación post-ejercicio'],
      zh: ['肌肉紧张和僵硬', '背部和颈部疼痛', '压力和焦虑', '失眠', '血液循环不良', '疲劳', '运动后恢复']
    },
    indicationTags: ['dor', 'stress', 'insomnia', 'fadiga', 'circulacao'],
    contraindications: {
      pt: ['Inflamações agudas na pele', 'Feridas abertas', 'Varicose veias severas', 'Trombose venosa profunda', 'Câncer (sem aprovação médica)'],
      en: ['Acute skin inflammations', 'Open wounds', 'Severe varicose veins', 'Deep vein thrombosis', 'Cancer (without medical approval)'],
      es: ['Inflamaciones agudas de la piel', 'Heridas abiertas', 'Varices severas', 'Trombosis venosa profunda', 'Cáncer (sin aprobación médica)'],
      zh: ['急性皮肤炎症', '开放性伤口', '严重的静脉曲张', '深静脉血栓形成', '癌症（未获医疗批准）']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1596178065887-cb8893a84fd7?w=500&h=300&fit=crop'
  },
  {
    id: 'yoga',
    name: { pt: 'Yoga (Hatha, Vinyasa, Yin, Restaurativa)', en: 'Yoga (Hatha, Vinyasa, Yin, Restorative)', es: 'Yoga (Hatha, Vinyasa, Yin, Restaurativo)', zh: '瑜伽（哈他、流瑜伽、阴瑜伽、修复性）' },
    category: 'body',
    description: {
      pt: 'Prática milenar indiana que integra posturas físicas (asanas), respiração (pranayama) e meditação para alcançar harmonia entre corpo, mente e espírito. Diferentes estilos adaptam-se a diversos níveis de intensidade e objetivos.',
      en: 'Ancient Indian practice integrating physical postures (asanas), breathing (pranayama) and meditation to achieve harmony between body, mind and spirit. Different styles adapt to various intensity levels and goals.',
      es: 'Práctica milenaria india que integra posturas físicas (asanas), respiración (pranayama) y meditación para lograr armonía entre cuerpo, mente y espíritu. Los diferentes estilos se adaptan a varios niveles de intensidad y objetivos.',
      zh: '古老的印度修行，整合了身体姿态（体式）、呼吸（调息法）和冥想，以实现身心灵的和谐。不同的风格适应各种强度级别和目标。'
    },
    indications: {
      pt: ['Flexibilidade e mobilidade reduzidas', 'Fraqueza muscular', 'Estresse e ansiedade', 'Insônia', 'Problemas posturais', 'Falta de energia', 'Desequilíbrio emocional'],
      en: ['Reduced flexibility and mobility', 'Muscle weakness', 'Stress and anxiety', 'Insomnia', 'Postural problems', 'Lack of energy', 'Emotional imbalance'],
      es: ['Flexibilidad y movilidad reducidas', 'Debilidad muscular', 'Estrés y ansiedad', 'Insomnio', 'Problemas posturales', 'Falta de energía', 'Desequilibrio emocional'],
      zh: ['灵活性和活动能力下降', '肌肉无力', '压力和焦虑', '失眠', '姿态问题', '缺乏能量', '情感失衡']
    },
    indicationTags: ['flexibilidade', 'stress', 'insomnia', 'postura', 'energia'],
    contraindications: {
      pt: ['Lesões grave da coluna (sem orientação)', 'Pressão arterial não controlada', 'Desprendimento de retina', 'Gravidez (apenas yoga restaurativa)', 'Cirurgias recentes no abdômen'],
      en: ['Serious spinal injuries (without guidance)', 'Uncontrolled high blood pressure', 'Retinal detachment', 'Pregnancy (restorative yoga only)', 'Recent abdominal surgeries'],
      es: ['Lesiones graves de la columna vertebral (sin orientación)', 'Presión arterial no controlada', 'Desprendimiento de retina', 'Embarazo (solo yoga restaurativo)', 'Cirugías abdominales recientes'],
      zh: ['严重的脊柱损伤（无指导）', '血压不受控制', '视网膜脱离', '怀孕（仅修复瑜伽）', '最近的腹部手术']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop'
  },
  {
    id: 'pilates',
    name: { pt: 'Pilates Clínico/Integrativo', en: 'Clinical/Integrative Pilates', es: 'Pilates Clínico/Integrativo', zh: '临床/综合普拉提' },
    category: 'body',
    description: {
      pt: 'Método estruturado de exercício que desenvolve força do "core", melhora flexibilidade, alinhamento postural e consciência corporal. Combina controle preciso do movimento, respiração coordenada e concentração mental para transformar o corpo e mente.',
      en: 'Structured exercise method that develops core strength, improves flexibility, postural alignment and body awareness. Combines precise movement control, coordinated breathing and mental focus to transform body and mind.',
      es: 'Método de ejercicio estructurado que desarrolla la fuerza del núcleo, mejora la flexibilidad, el alineamiento postural y la conciencia corporal. Combina el control preciso del movimiento, la respiración coordinada y el enfoque mental para transformar el cuerpo y la mente.',
      zh: '结构化的锻炼方法，可增强核心力量，改善灵活性、姿态对齐和身体意识。结合精确的动作控制、协调的呼吸和精神专注力来改变身体和心理。'
    },
    indications: {
      pt: ['Fraqueza abdominal', 'Problemas posturais', 'Dores lombares', 'Reabilitação após lesão', 'Flacidez muscular', 'Falta de equilíbrio', 'Recuperação pós-parto'],
      en: ['Abdominal weakness', 'Postural problems', 'Lower back pain', 'Rehabilitation after injury', 'Muscle flaccidity', 'Lack of balance', 'Postpartum recovery'],
      es: ['Debilidad abdominal', 'Problemas posturales', 'Dolor lumbar', 'Rehabilitación después de lesión', 'Flacidez muscular', 'Falta de equilibrio', 'Recuperación posparto'],
      zh: ['腹部无力', '姿态问题', '腰痛', '受伤后的康复', '肌肉松弛', '缺乏平衡', '产后恢复']
    },
    indicationTags: ['dor', 'postura', 'reabilitacao', 'equilibrio'],
    contraindications: {
      pt: ['Osteoporose severa', 'Hérnia de disco aguda', 'Inflamação articular severa', 'Gravidez (sem adaptações)', 'Vertigem ou desequilíbrio severo'],
      en: ['Severe osteoporosis', 'Acute disc herniation', 'Severe joint inflammation', 'Pregnancy (without adaptations)', 'Severe vertigo or imbalance'],
      es: ['Osteoporosis severa', 'Hernia de disco aguda', 'Inflamación articular severa', 'Embarazo (sin adaptaciones)', 'Vértigo severo o desequilibrio'],
      zh: ['严重骨质疏松症', '急性椎间盘突出', '严重的关节炎症', '怀孕（没有适应）', '严重的眩晕或失衡']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop'
  },
  {
    id: 'reiki',
    name: { pt: 'Reiki (Usui, Xamânico, Karuna)', en: 'Reiki (Usui, Shamanic, Karuna)', es: 'Reiki (Usui, Chamánico, Karuna)', zh: '灵气（臼井、萨满、卡鲁纳）' },
    category: 'energy',
    description: {
      pt: 'Técnica japonesa de canalização de energia universal através das mãos. O reikiano atua como canal para transmitir energia de cura que equilibra os centros energéticos (chakras) e restaura o fluxo vital, promovendo bem-estar físico e emocional.',
      en: 'Japanese technique of channeling universal energy through the hands. The reiki practitioner acts as a channel to transmit healing energy that balances energy centers (chakras) and restores vital flow, promoting physical and emotional well-being.',
      es: 'Técnica japonesa de canalizar la energía universal a través de las manos. El practicante de reiki actúa como un canal para transmitir energía curativa que equilibra los centros de energía (chakras) y restaura el flujo vital, promoviendo el bienestar físico y emocional.',
      zh: '日本技术通过双手传导宇宙能量。灵气从业者充当渠道，传递平衡能量中心（脉轮）并恢复生命流动的治疗能量，促进身心健康。'
    },
    indications: {
      pt: ['Estresse e tensão emocional', 'Dor crônica', 'Insônia e falta de sono', 'Baixa energia vital', 'Desequilíbrio energético', 'Apoio durante tratamentos médicos', 'Luto e processamento de traumas'],
      en: ['Stress and emotional tension', 'Chronic pain', 'Insomnia and lack of sleep', 'Low vital energy', 'Energetic imbalance', 'Support during medical treatments', 'Grief and trauma processing'],
      es: ['Estrés y tensión emocional', 'Dolor crónico', 'Insomnio y falta de sueño', 'Energía vital baja', 'Desequilibrio energético', 'Apoyo durante tratamientos médicos', 'Duelo y procesamiento de traumas'],
      zh: ['压力和情感紧张', '慢性疼痛', '失眠和睡眠不足', '生命能量低', '能量失衡', '医学治疗期间的支持', '悲伤和创伤处理']
    },
    indicationTags: ['stress', 'dor', 'insomnia', 'energia', 'trauma'],
    contraindications: {
      pt: ['Marcapassos (sem aprovação médica)', 'Psicose ou alucinações', 'Dependência de drogas em negação', 'Pós-operatório imediato (24h)', 'Nenhuma contraindicação física absoluta'],
      en: ['Pacemakers (without medical approval)', 'Psychosis or hallucinations', 'Drug addiction in denial', 'Immediate postoperative (24h)', 'No absolute physical contraindications'],
      es: ['Marcapasos (sin aprobación médica)', 'Psicosis o alucinaciones', 'Adicción a drogas en negación', 'Postoperatorio inmediato (24h)', 'Sin contraindicaciones físicas absolutas'],
      zh: ['起搏器（无医疗批准）', '精神病或幻觉', '毒品成瘾否认', '立即术后（24小时）', '没有绝对的身体禁忌症']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1544727278-ca506c4e7f06?w=500&h=300&fit=crop'
  },
  {
    id: 'meditacao-guiada',
    name: { pt: 'Meditação Guiada', en: 'Guided Meditation', es: 'Meditación Guiada', zh: '引导冥想' },
    category: 'mind',
    description: {
      pt: 'Prática de foco mental e relaxamento conduzida por um instrutor. Combina técnicas respiratórias, visualização e atenção focada para acalmar a mente, reduzir estresse e induzir um estado profundo de relaxamento e bem-estar.',
      en: 'Mental focus and relaxation practice conducted by an instructor. Combines breathing techniques, visualization and focused attention to calm the mind, reduce stress and induce a deep state of relaxation and well-being.',
      es: 'Práctica de enfoque mental y relajación conducida por un instructor. Combina técnicas de respiración, visualización y atención enfocada para calmar la mente, reducir el estrés e inducir un estado profundo de relajación y bienestar.',
      zh: '由教练进行的心理集中和放松练习。结合呼吸技巧、可视化和集中注意力来平复心灵、减少压力并引发深层放松和幸福感。'
    },
    indications: {
      pt: ['Estresse e tensão mental', 'Ansiedade', 'Insônia', 'Hipertensão arterial', 'Dificuldade de concentração', 'Falta de equilíbrio emocional', 'Preparação para eventos'],
      en: ['Stress and mental tension', 'Anxiety', 'Insomnia', 'High blood pressure', 'Difficulty concentrating', 'Lack of emotional balance', 'Preparation for events'],
      es: ['Estrés y tensión mental', 'Ansiedad', 'Insomnio', 'Presión arterial alta', 'Dificultad para concentrarse', 'Falta de equilibrio emocional', 'Preparación para eventos'],
      zh: ['压力和精神紧张', '焦虑', '失眠', '高血压', '注意力集中困难', '缺乏情感平衡', '事件的准备']
    },
    indicationTags: ['stress', 'insomnia', 'ansiedade', 'concentracao', 'pressao'],
    contraindications: {
      pt: ['Episódios psicóticos agudos', 'TEPT severo (pode necessitar superviso)', 'Alucinações auditivas', 'Depressão suicida (não use sozinho)', 'Déficit de atenção severo'],
      en: ['Acute psychotic episodes', 'Severe PTSD (may need supervision)', 'Auditory hallucinations', 'Suicidal depression (do not use alone)', 'Severe attention deficit'],
      es: ['Episodios psicóticos agudos', 'TEPT severo (puede requerir supervisión)', 'Alucinaciones auditivas', 'Depresión suicida (no use solo)', 'Déficit de atención severo'],
      zh: ['急性精神病发作', '严重PTSD（可能需要监督）', '听觉幻觉', '自杀抑郁症（不要单独使用）', '严重的注意力缺陷']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop'
  },
  {
    id: 'aromaterapia',
    name: { pt: 'Aromaterapia', en: 'Aromatherapy', es: 'Aromaterapia', zh: '芳香疗法' },
    category: 'nature',
    description: {
      pt: 'Terapia que utiliza óleos essenciais extraídos de plantas para promover saúde física, mental e emocional. Os aromas trabalham através do olfato e absorção pela pele, influenciando hormônios, emoções e processos fisiológicos do corpo.',
      en: 'Therapy using essential oils extracted from plants to promote physical, mental and emotional health. The aromas work through smell and skin absorption, influencing hormones, emotions and body\'s physiological processes.',
      es: 'Terapia que utiliza aceites esenciales extraídos de plantas para promover la salud física, mental y emocional. Los aromas actúan a través del olfato y la absorción por la piel, influyendo en las hormonas, emociones y procesos fisiológicos del cuerpo.',
      zh: '利用从植物中提取的精油的疗法，以促进身心健康。香气通过嗅觉和皮肤吸收工作，影响激素、情绪和身体的生理过程。'
    },
    indications: {
      pt: ['Estresse e ansiedade', 'Insônia', 'Dores musculares', 'Problemas respiratórios', 'Desequilíbrio emocional', 'Falta de energia', 'Problemas de pele'],
      en: ['Stress and anxiety', 'Insomnia', 'Muscle pain', 'Respiratory problems', 'Emotional imbalance', 'Lack of energy', 'Skin problems'],
      es: ['Estrés y ansiedad', 'Insomnio', 'Dolor muscular', 'Problemas respiratorios', 'Desequilibrio emocional', 'Falta de energía', 'Problemas de piel'],
      zh: ['压力和焦虑', '失眠', '肌肉疼痛', '呼吸问题', '情感失衡', '缺乏能量', '皮肤问题']
    },
    indicationTags: ['stress', 'insomnia', 'dor', 'respiracao', 'energia'],
    contraindications: {
      pt: ['Alergia a plantas específicas', 'Asma severa (alguns óleos podem irritar)', 'Gravidez (certos óleos são teratogênicos)', 'Fotossensibilidade (óleos cítricos)', 'Nunca ingerir óleos sem orientação'],
      en: ['Allergy to specific plants', 'Severe asthma (some oils may irritate)', 'Pregnancy (some oils are teratogenic)', 'Photosensitivity (citrus oils)', 'Never ingest oils without guidance'],
      es: ['Alergia a plantas específicas', 'Asma severa (algunos aceites pueden irritar)', 'Embarazo (algunos aceites son teratogénicos)', 'Fotosensibilidad (aceites cítricos)', 'Nunca ingerir aceites sin orientación'],
      zh: ['对特定植物过敏', '严重哮喘（某些油可能会刺激）', '怀孕（某些油是致畸）', '光敏感性（柑橘油）', '未经指导不要摄入油']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=300&fit=crop'
  }
]

export const categories = [
  {
    id: 'body',
    name: { pt: 'Terapias Corporais', en: 'Body Therapies', es: 'Terapias Corporales', zh: '身体疗法' },
    description: {
      pt: 'Foco no físico, toque e movimento',
      en: 'Focus on physical, touch and movement',
      es: 'Enfoque en lo físico, el tacto y el movimiento',
      zh: '注重身体、触觉和运动'
    }
  },
  {
    id: 'energy',
    name: { pt: 'Terapias Energéticas', en: 'Energy Therapies', es: 'Terapias Energéticas', zh: '能量疗法' },
    description: {
      pt: 'Harmonização do campo energético',
      en: 'Energetic field harmonization',
      es: 'Armonización del campo energético',
      zh: '能量场谐波'
    }
  },
  {
    id: 'mind',
    name: { pt: 'Terapias da Mente', en: 'Mind Therapies', es: 'Terapias Mentales', zh: '心理疗法' },
    description: {
      pt: 'Autoconhecimento e transformação mental',
      en: 'Self-knowledge and mental transformation',
      es: 'Autoconocimiento y transformación mental',
      zh: '自我认知和心理转变'
    }
  },
  {
    id: 'nature',
    name: { pt: 'Terapias Naturais', en: 'Nature Therapies', es: 'Terapias Naturales', zh: '自然疗法' },
    description: {
      pt: 'Força da natureza e estilo de vida',
      en: 'Power of nature and lifestyle',
      es: 'Poder de la naturaleza y estilo de vida',
      zh: '自然的力量和生活方式'
    }
  },
  {
    id: 'shamanic',
    name: { pt: 'Terapias Xamânicas', en: 'Shamanic Therapies', es: 'Terapias Chamánicas', zh: '萨满疗法' },
    description: {
      pt: 'Ancestralidade e espiritualidade',
      en: 'Ancestrality and spirituality',
      es: 'Ancestralidad y espiritualidad',
      zh: '祖先和精神性'
    }
  }
]
