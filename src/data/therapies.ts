export interface Therapy {
  id: string
  name: Record<'pt' | 'en' | 'es' | 'zh', string>
  category: 'body' | 'energy' | 'mind' | 'natural'
  description: Record<'pt' | 'en' | 'es' | 'zh', string>
  indications: Record<'pt' | 'en' | 'es' | 'zh', string[]>
  indicationTags: string[]
  contraindications: Record<'pt' | 'en' | 'es' | 'zh', string[]>
  modality: 'presencial' | 'online' | 'presencial_online'
  image: string
}

export const therapies: Therapy[] = [
  {
    id: 'acupuntura',
    name: { 
      pt: 'Acupuntura', 
      en: 'Acupuncture', 
      es: 'Acupuntura', 
      zh: '针灸' 
    },
    category: 'body',
    description: {
      pt: 'Técnica milenar da Medicina Tradicional Chinesa que utiliza agulhas finas para desbloquear o fluxo de energia (Qi). O tratamento visa restaurar o equilíbrio sistêmico do corpo e estimular a produção de analgésicos naturais. É amplamente reconhecida pela eficácia no manejo da dor e regulação emocional.',
      en: 'Ancient Traditional Chinese Medicine technique using fine needles to unblock energy flow (Qi). The treatment aims to restore systemic body balance and stimulate natural painkiller production. It is widely recognized for pain management and emotional regulation.',
      es: 'Técnica milenaria de la Medicina Tradicional China que utiliza agujas finas para desbloquear el flujo de energía (Qi). El tratamiento busca restaurar el equilibrio sistémico del cuerpo y estimular la producción de analgésicos naturales. Es ampliamente reconocida por su eficacia en el manejo del dolor.',
      zh: '中医古老技术，使用细针疏通气流（Qi）。该疗法旨在恢复身体系统平衡并刺激天然止痛药的产生。'
    },
    indications: {
      pt: ['Dores crônicas e agudas', 'Enxaquecas e cefaleias', 'Ansiedade e depressão leve', 'Artrite e artrose', 'Cólicas menstruais', 'Insônia', 'Rinite e sinusite'],
      en: ['Chronic and acute pain', 'Migraines', 'Anxiety', 'Arthritis', 'Menstrual cramps', 'Insomnia', 'Sinusitis'],
      es: ['Dolores crónicos', 'Migrañas', 'Ansiedad', 'Artritis', 'Cólicos menstruales', 'Insomnio', 'Rinitis'],
      zh: ['慢性疼痛', '偏头痛', '焦虑', '关节炎', '痛经', '失眠', '鼻炎']
    },
    indicationTags: ['dor', 'equilibrio', 'ansiedade', 'saude', 'bem-estar'],
    contraindications: {
      pt: ['Hemofilia ou distúrbios graves de coagulação', 'Fobia extrema de agulhas', 'Infecções de pele no local da aplicação', 'Gravidez (requer restrição de pontos)', 'Estado de jejum prolongado'],
      en: ['Hemophilia', 'Needle phobia', 'Skin infections', 'Pregnancy (point restrictions)', 'Prolonged fasting'],
      es: ['Hemofilia', 'Fobia a las agujas', 'Infecciones cutáneas', 'Embarazo (puntos restringidos)', 'Ayuno prolongado'],
      zh: ['血友病', '针头恐惧症', '皮肤感染', '怀孕（穴位限制）', '长期禁食']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop'
  },
  {
    id: 'ayurveda',
    name: { 
      pt: 'Ayurveda', 
      en: 'Ayurveda', 
      es: 'Ayurveda', 
      zh: '阿育吠陀' 
    },
    category: 'body',
    description: {
      pt: 'Sistema médico indiano de 5.000 anos que foca na prevenção e cura através do equilíbrio dos Doshas (Vata, Pitta, Kapha). O tratamento é altamente personalizado, combinando dieta, fitoterapia e rotinas diárias. Busca tratar a causa raiz das doenças e não apenas os sintomas.',
      en: '5,000-year-old Indian medical system focusing on prevention and healing through Dosha balance. Treatment is highly personalized, combining diet, herbalism, and daily routines. It seeks to treat the root cause of diseases.',
      es: 'Sistema médico indio de 5.000 años que se centra en la prevención y curación a través del equilibrio de los Doshas. El tratamiento es altamente personalizado, combinando dieta, fitoterapia y rutinas diarias. Busca tratar la causa raíz de las enfermedades.',
      zh: '拥有5000年历史的印度医学体系，通过平衡能量（Doshas）专注于预防和治疗。'
    },
    indications: {
      pt: ['Problemas digestivos crônicos', 'Desintoxicação corporal', 'Fadiga e exaustão', 'Problemas de pele', 'Desequilíbrios hormonais', 'Ansiedade e estresse', 'Controle de peso'],
      en: ['Digestive issues', 'Body detox', 'Fatigue', 'Skin problems', 'Hormonal imbalances', 'Anxiety', 'Weight control'],
      es: ['Problemas digestivos', 'Desintoxicación', 'Fatiga', 'Problemas de piel', 'Desequilibrios hormonales', 'Ansiedad', 'Control de peso'],
      zh: ['消化问题', '排毒', '疲劳', '皮肤问题', '荷尔蒙失调', '焦虑', '体重控制']
    },
    indicationTags: ['digestão', 'nutrição', 'detox', 'doshas', 'natureza'],
    contraindications: {
      pt: ['Quadros de indigestão aguda (Ama)', 'Febre alta', 'Menstruação (para massagens corporais)', 'Gravidez de risco', 'Estados de debilidade extrema'],
      en: ['Acute indigestion', 'High fever', 'Menstruation (body massages)', 'High-risk pregnancy', 'Extreme debility'],
      es: ['Indigestión aguda', 'Fiebre alta', 'Menstruación (masajes)', 'Embarazo de riesgo', 'Debilidad extrema'],
      zh: ['急性消化不良', '高烧', '月经（按摩）', '高危妊娠', '极度虚弱']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1509241790015-5a0af9739d21?w=600&h=400&fit=crop'
  },
  {
    id: 'biodinamica',
    name: { 
      pt: 'Massagem Biodinâmica', 
      en: 'Biodynamic Massage', 
      es: 'Masaje Biodinámico', 
      zh: '生物动力按摩' 
    },
    category: 'body',
    description: {
      pt: 'Terapia corporal suave desenvolvida por Gerda Boyesen que foca na digestão de estresse emocional. Utiliza um estetoscópio para monitorar os ruídos peristálticos e guiar o toque. O objetivo é restaurar o fluxo natural da energia vital e dissolver couraças musculares.',
      en: 'Gentle body therapy developed by Gerda Boyesen focusing on emotional stress digestion. Uses a stethoscope to monitor peristaltic sounds. The goal is to restore natural energy flow and dissolve muscular armoring.',
      es: 'Terapia corporal suave desarrollada por Gerda Boyesen que se centra en la digestión del estrés emocional. Utiliza un estetoscopio para monitorear sonidos peristálticos. El objetivo es restaurar el flujo natural de energía.',
      zh: '温和的身体疗法，专注于消化情绪压力，旨在恢复生命能量流动。'
    },
    indications: {
      pt: ['Estresse pós-traumático', 'Distúrbios psicossomáticos', 'Ansiedade crônica', 'Tensão muscular rígida', 'Dificuldade de relaxamento', 'Bloqueios emocionais', 'Problemas digestivos nervosos'],
      en: ['Post-traumatic stress', 'Psychosomatic disorders', 'Chronic anxiety', 'Rigid muscle tension', 'Relaxation difficulty', 'Emotional blocks', 'Nervous digestion'],
      es: ['Estrés postraumático', 'Trastornos psicosomáticos', 'Ansiedad crónica', 'Tensión muscular rígida', 'Dificultad para relajarse', 'Bloqueos emocionales', 'Problemas digestivos'],
      zh: ['创伤后应激障碍', '身心疾病', '慢性焦虑', '肌肉紧张', '放松困难', '情绪阻滞', '神经性消化']
    },
    indicationTags: ['psicossomatica', 'relaxamento', 'massagem', 'emoções', 'toque'],
    contraindications: {
      pt: ['Processos psicóticos agudos', 'Infecções inflamatórias agudas', 'Febre', 'Primeiro trimestre de gravidez', 'Trombose venosa profunda'],
      en: ['Acute psychosis', 'Acute inflammatory infections', 'Fever', 'First trimester pregnancy', 'Deep vein thrombosis'],
      es: ['Psicosis aguda', 'Infecciones inflamatorias agudas', 'Fiebre', 'Primer trimestre de embarazo', 'Trombosis venosa profunda'],
      zh: ['急性精神病', '急性炎症', '发烧', '怀孕初期', '深静脉血栓']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&h=400&fit=crop'
  },
  {
    id: 'chi-kung',
    name: { 
      pt: 'Chi Kung (Qi Gong)', 
      en: 'Chi Kung (Qi Gong)', 
      es: 'Chi Kung (Qi Gong)', 
      zh: '气功' 
    },
    category: 'body',
    description: {
      pt: 'Prática chinesa de cultivo da energia vital através de movimentos lentos, respiração rítmica e foco mental. Atua preventivamente fortalecendo o sistema imunológico e a vitalidade. É considerado uma meditação em movimento acessível a todas as idades.',
      en: 'Chinese practice of cultivating vital energy through slow movements, rhythmic breathing and mental focus. Acts preventively strengthening immunity. Considered moving meditation accessible to all ages.',
      es: 'Práctica china de cultivo de energía vital mediante movimientos lentos, respiración rítmica y enfoque mental. Actúa preventivamente fortaleciendo la inmunidad. Se considera meditación en movimiento accesible para todas las edades.',
      zh: '通过缓慢运动、节奏呼吸和精神集中培养生命能量的中国习俗。'
    },
    indications: {
      pt: ['Fortalecimento imunológico', 'Hipertensão arterial', 'Fadiga e cansaço', 'Dores articulares', 'Equilíbrio emocional', 'Melhora da concentração', 'Reabilitação física suave'],
      en: ['Immune strengthening', 'High blood pressure', 'Fatigue', 'Joint pain', 'Emotional balance', 'Better focus', 'Gentle physical rehab'],
      es: ['Fortalecimiento inmunológico', 'Hipertensión arterial', 'Fatiga', 'Dolor articular', 'Equilibrio emocional', 'Mejor concentración', 'Rehabilitación suave'],
      zh: ['增强免疫力', '高血压', '疲劳', '关节痛', '情绪平衡', '专注力', '康复']
    },
    indicationTags: ['movimento', 'respiração', 'vitalidade', 'longevidade', 'meditação'],
    contraindications: {
      pt: ['Infecções agudas com febre', 'Exaustão física extrema', 'Após refeições pesadas', 'Cirurgias muito recentes', 'Transtornos psiquiátricos descompensados'],
      en: ['Acute infections with fever', 'Extreme exhaustion', 'After heavy meals', 'Recent surgeries', 'Uncompensated psychiatric disorders'],
      es: ['Infecciones agudas con fiebre', 'Agotamiento extremo', 'Después de comidas pesadas', 'Cirugías recientes', 'Trastornos psiquiátricos descompensados'],
      zh: ['发烧急性感染', '极度疲劳', '饭后', '近期手术', '不稳定的精神障碍']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop'
  },
  {
    id: 'drenagem-linfatica',
    name: { 
      pt: 'Drenagem Linfática', 
      en: 'Lymphatic Drainage', 
      es: 'Drenaje Linfático', 
      zh: '淋巴引流' 
    },
    category: 'body',
    description: {
      pt: 'Técnica de massagem manual suave que estimula o sistema linfático a eliminar excesso de fluidos e toxinas. É essencial para redução de edemas e aceleração da recuperação pós-cirúrgica. Promove também um relaxamento profundo devido ao ritmo lento e repetitivo.',
      en: 'Gentle manual massage technique that stimulates the lymphatic system to eliminate excess fluids and toxins. Essential for edema reduction and post-surgical recovery. Promotes deep relaxation through slow, repetitive rhythm.',
      es: 'Técnica de masaje manual suave que estimula el sistema linfático a eliminar exceso de fluidos y toxinas. Esencial para reducir edemas y acelerar la recuperación posquirúrgica. Promueve relajación profunda mediante ritmo lento y repetitivo.',
      zh: '温和的手法按摩，刺激淋巴系统排出多余液体和毒素。'
    },
    indications: {
      pt: ['Retenção de líquidos', 'Inchaço na gravidez', 'Pós-operatório de cirurgias', 'Celulite', 'Linfedemas', 'Relaxamento do sistema nervoso', 'Desintoxicação'],
      en: ['Fluid retention', 'Pregnancy swelling', 'Post-surgical recovery', 'Cellulite', 'Lymphedema', 'Nervous system relaxation', 'Detoxification'],
      es: ['Retención de líquidos', 'Hinchazón en el embarazo', 'Recuperación posquirúrgica', 'Celulitis', 'Linfedema', 'Relajación del sistema nervioso', 'Desintoxicación'],
      zh: ['体液潴留', '孕期肿胀', '术后', '橘皮组织', '淋巴水肿', '放松', '排毒']
    },
    indicationTags: ['inchaço', 'estetica', 'saude', 'circulação', 'detox'],
    contraindications: {
      pt: ['Tumores malignos não tratados', 'Trombose venosa profunda (TVP)', 'Infecções agudas (bacterianas/virais)', 'Insuficiência cardíaca congestiva', 'Hipertensão não controlada'],
      en: ['Untreated malignant tumors', 'Deep vein thrombosis (DVT)', 'Acute infections (bacterial/viral)', 'Congestive heart failure', 'Uncontrolled hypertension'],
      es: ['Tumores malignos no tratados', 'Trombosis venosa profunda (TVP)', 'Infecciones agudas (bacterianas/virales)', 'Insuficiencia cardíaca congestiva', 'Hipertensión no controlada'],
      zh: ['未治疗的恶性肿瘤', '深静脉血栓', '急性感染', '充血性心力衰竭', '未控制的高血压']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop'
  },
  {
    id: 'liberacao-miofascial',
    name: { 
      pt: 'Liberação Miofascial', 
      en: 'Myofascial Release', 
      es: 'Liberación Miofascial', 
      zh: '肌筋膜释放' 
    },
    category: 'body',
    description: {
      pt: 'Técnica manual ou instrumental focada na fáscia, o tecido conectivo que envolve os músculos. Visa soltar aderências, melhorar a mobilidade e reduzir dores crônicas de tensão. É muito utilizada por atletas e pessoas com postura rígida.',
      en: 'Manual or instrumental technique focused on fascia, the connective tissue surrounding muscles. Aims to release adhesions, improve mobility and reduce chronic tension pain. Widely used by athletes and people with rigid posture.',
      es: 'Técnica manual o instrumental enfocada en la fascia, el tejido conectivo que rodea los músculos. Tiene como objetivo liberar adhesiones, mejorar la movilidad y reducir el dolor de tensión crónica. Muy utilizado por atletas y personas con postura rígida.',
      zh: '专注于筋膜的手法或器械技术，旨在释放粘连，提高活动能力并减轻疼痛。'
    },
    indications: {
      pt: ['Dor muscular crônica', 'Fibromialgia', 'Recuperação pós-treino', 'Melhora da amplitude de movimento', 'Correção postural', 'Cefaleia tensional', 'Fascite plantar'],
      en: ['Chronic muscle pain', 'Fibromyalgia', 'Post-workout recovery', 'Improved range of motion', 'Postural correction', 'Tension headache', 'Plantar fasciitis'],
      es: ['Dolor muscular crónico', 'Fibromialgia', 'Recuperación postejercicio', 'Mejorada amplitud de movimiento', 'Corrección postural', 'Cefalea tensional', 'Fascitis plantar'],
      zh: ['慢性肌肉痛', '纤维肌痛', '训练后恢复', '运动范围', '姿势', '紧张性头痛', '足底筋膜炎']
    },
    indicationTags: ['fáscia', 'massagem', 'dor', 'esporte', 'flexibilidade'],
    contraindications: {
      pt: ['Feridas abertas ou queimaduras', 'Fraturas ou ossos quebrados recentes', 'Uso de anticoagulantes (requer cuidado)', 'Hipresensibilidade cutânea severa', 'Trombose ou flebite'],
      en: ['Open wounds or burns', 'Recent fractures or broken bones', 'Anticoagulant use (requires care)', 'Severe skin hypersensitivity', 'Thrombosis or phlebitis'],
      es: ['Heridas abiertas o quemaduras', 'Fracturas óseas recientes', 'Uso de anticoagulantes (requiere cuidado)', 'Hipersensibilidad cutánea severa', 'Trombosis o flebitis'],
      zh: ['开放性伤口', '近期骨折', '血液稀释剂', '皮肤过敏', '血栓']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1549576228-d1c7ef1b3a8e?w=600&h=400&fit=crop'
  },
  {
    id: 'massagem-tantrica',
    name: { 
      pt: 'Massagem Tântrica', 
      en: 'Tantric Massage', 
      es: 'Masaje Tántrico', 
      zh: '密宗按摩' 
    },
    category: 'body',
    description: {
      pt: 'Terapia bioenergética que utiliza toques sutis e intensos para redistribuir a energia sexual pelo corpo. Não tem conotação de serviço sexual, mas sim de cura de traumas, expansão da sensibilidade e autoconhecimento. Ajuda a desbloquear repressões e aumentar a vitalidade.',
      en: 'Bioenergetic therapy using subtle and intense touches to redistribute sexual energy throughout the body. Not sexual service, but trauma healing, expanding sensitivity and self-knowledge. Helps unblock repression and increase vitality.',
      es: 'Terapia bioenergética que utiliza toques sutiles e intensos para redistribuir la energía sexual por todo el cuerpo. No tiene connotación de servicio sexual, sino de curación de traumas, expansión de la sensibilidad y autoconocimiento. Ayuda a desbloquear represiones.',
      zh: '利用触摸重新分配性能量的生物能量疗法。旨在治愈创伤、扩展敏感度和自我认识。'
    },
    indications: {
      pt: ['Disfunções sexuais (vaginismo, ejaculação precoce)', 'Baixa libido ou anorgasmia', 'Traumas relacionados à sexualidade', 'Desconexão com o próprio corpo', 'Estresse e ansiedade elevados', 'Busca por autoconhecimento sensorial', 'Bloqueios emocionais profundos'],
      en: ['Sexual dysfunctions (vaginismus, premature ejaculation)', 'Low libido or anorgasmia', 'Sexuality-related trauma', 'Disconnection from own body', 'High stress and anxiety', 'Sensory self-knowledge', 'Deep emotional blocks'],
      es: ['Disfunciones sexuales (vaginismo, eyaculación precoz)', 'Libido baja o anorgasmia', 'Trauma relacionado con la sexualidad', 'Desconexión del propio cuerpo', 'Estrés y ansiedad elevados', 'Búsqueda de autoconocimiento sensorial', 'Bloqueos emocionales profundos'],
      zh: ['性功能障碍', '性欲低下', '性创伤', '身体脱节', '高压', '感官自我认识', '情绪阻滞']
    },
    indicationTags: ['sexualidade', 'trauma', 'energia', 'corpo', 'sensibilidade'],
    contraindications: {
      pt: ['Histórico de abuso sexual severo (sem acompanhamento psicológico paralelo)', 'Transtornos psiquiátricos graves', 'Feridas ou infecções genitais', 'Gestação de risco (primeiro trimestre)', 'Desconforto extremo com nudez'],
      en: ['History of severe sexual abuse (without parallel psychological support)', 'Serious psychiatric disorders', 'Genital wounds or infections', 'High-risk pregnancy (first trimester)', 'Extreme discomfort with nudity'],
      es: ['Historial de abuso sexual severo (sin apoyo psicológico paralelo)', 'Trastornos psiquiátricos graves', 'Heridas o infecciones genitales', 'Embarazo de riesgo (primer trimestre)', 'Extrema incomodidad con la desnudez'],
      zh: ['严重性虐待史', '严重精神障碍', '生殖器感染', '高危妊娠', '极度不适裸体']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&h=400&fit=crop'
  },
  {
    id: 'osteopatia',
    name: { 
      pt: 'Osteopatia', 
      en: 'Osteopathy', 
      es: 'Osteopatía', 
      zh: '整骨疗法' 
    },
    category: 'body',
    description: {
      pt: 'Sistema de avaliação e tratamento que foca na interrelação entre estrutura e função do corpo. O osteopata utiliza as mãos para diagnosticar restrições de mobilidade em articulações, tecidos e órgãos. O objetivo é permitir que o corpo se auto-regule e cure.',
      en: 'Assessment and treatment system focusing on the interrelation between body structure and function. The osteopath uses hands to diagnose mobility restrictions in joints, tissues and organs. Goal is to allow body self-regulation and healing.',
      es: 'Sistema de evaluación y tratamiento que se centra en la interrelación entre la estructura y la función del cuerpo. El osteópata usa las manos para diagnosticar restricciones de movilidad en articulaciones, tejidos y órganos. El objetivo es permitir la autorregulación y curación del cuerpo.',
      zh: '专注于身体结构和功能相互关系的治疗系统。整骨医生用手诊断关节、组织和器官的活动限制。'
    },
    indications: {
      pt: ['Dores na coluna (lombalgia, cervicalgia)', 'Hérnia de disco', 'Ciática', 'Dores de cabeça tensionais', 'Refluxo gastroesofágico (visceral)', 'Lesões esportivas', 'Disfunção da ATM'],
      en: ['Spine pain (low back, neck pain)', 'Herniated disc', 'Sciatica', 'Tension headaches', 'GERD (visceral)', 'Sports injuries', 'TMJ dysfunction'],
      es: ['Dolores de columna (lumbalgia, cervicalgia)', 'Hernia de disco', 'Ciática', 'Dolores de cabeza tensionales', 'Reflujo gastroesofágico (visceral)', 'Lesiones deportivas', 'Disfunción de la ATM'],
      zh: ['背痛', '椎间盘突出', '坐骨神经痛', '紧张性头痛', '反流', '运动损伤', '颞下颌关节功能障碍']
    },
    indicationTags: ['coluna', 'postura', 'dor', 'visceral', 'articulações'],
    contraindications: {
      pt: ['Câncer ósseo ou metástases', 'Infecções ósseas (osteomielite)', 'Fraturas não consolidadas', 'Artrite reumatoide em fase aguda', 'Osteoporose severa (para manipulações fortes)'],
      en: ['Bone cancer or metastasis', 'Bone infections (osteomyelitis)', 'Non-consolidated fractures', 'Acute rheumatoid arthritis', 'Severe osteoporosis (for strong manipulations)'],
      es: ['Cáncer óseo o metástasis', 'Infecciones óseas (osteomielitis)', 'Fracturas no consolidadas', 'Artritis reumatoide en fase aguda', 'Osteoporosis severa (para manipulaciones fuertes)'],
      zh: ['骨癌', '骨感染', '未愈合骨折', '急性类风湿性关节炎', '严重骨质疏松症']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1509241790015-5a0af9739d21?w=600&h=400&fit=crop'
  },
  {
    id: 'quiropraxia',
    name: { 
      pt: 'Quiropraxia', 
      en: 'Chiropractic', 
      es: 'Quiropráctica', 
      zh: '脊椎按摩疗法' 
    },
    category: 'body',
    description: {
      pt: 'Profissão focada no diagnóstico, tratamento e prevenção de problemas no sistema neuromusculoesquelético. Utiliza principalmente ajustes manuais na coluna vertebral para remover interferências nervosas. É muito procurada para alívio rápido de dores nas costas e pescoço.',
      en: 'Profession focused on diagnosis, treatment and prevention of neuromuscular-skeletal system problems. Mainly uses manual spinal adjustments to remove nerve interference. Sought for quick relief of back and neck pain.',
      es: 'Profesión enfocada en el diagnóstico, tratamiento y prevención de problemas del sistema neuromuscular esquelético. Utiliza principalmente ajustes espinales manuales para eliminar interferencias nerviosas. Muy buscada para alivio rápido del dolor de espalda y cuello.',
      zh: '专注于诊断和治疗神经肌肉骨骼系统问题的职业。使用脊柱调整来消除神经干扰。'
    },
    indications: {
      pt: ['Dor lombar aguda e crônica', 'Torcicolo e dor no pescoço', 'Dores de cabeça e enxaqueca', 'Hérnias de disco', 'Problemas de postura', 'Lesões por esforço repetitivo (LER)', 'Ciática'],
      en: ['Acute and chronic low back pain', 'Wry neck and neck pain', 'Headaches and migraines', 'Herniated discs', 'Posture problems', 'Repetitive strain injuries (RSI)', 'Sciatica'],
      es: ['Dolor lumbar agudo y crónico', 'Tortícolis y dolor de cuello', 'Dolores de cabeza y migrañas', 'Hernias de disco', 'Problemas de postura', 'Lesiones por esfuerzo repetitivo (LER)', 'Ciática'],
      zh: ['腰痛', '颈痛', '头痛', '椎间盘突出', '姿势问题', '重复性劳损', '坐骨神经痛']
    },
    indicationTags: ['coluna', 'ajuste', 'ossos', 'postura', 'alívio'],
    contraindications: {
      pt: ['Osteoporose avançada', 'Tumores na coluna', 'Fraturas recentes', 'Instabilidade espinhal grave', 'Infecções ósseas ou articulares'],
      en: ['Advanced osteoporosis', 'Spine tumors', 'Recent fractures', 'Severe spinal instability', 'Bone or joint infections'],
      es: ['Osteoporosis avanzada', 'Tumores de columna', 'Fracturas recientes', 'Inestabilidad espinhal grave', 'Infecciones óseas o articulares'],
      zh: ['晚期骨质疏松症', '脊柱肿瘤', '近期骨折', '严重脊柱不稳定', '骨感染']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1549576228-d1c7ef1b3a8e?w=600&h=400&fit=crop'
  },
  {
    id: 'reflexologia',
    name: { 
      pt: 'Reflexologia', 
      en: 'Reflexology', 
      es: 'Reflexología', 
      zh: '反射疗法' 
    },
    category: 'body',
    description: {
      pt: 'Terapia que aplica pressão em pontos específicos dos pés, mãos ou orelhas que correspondem a órgãos do corpo. Baseia-se no princípio de que o corpo inteiro está mapeado nessas extremidades. É excelente para relaxamento e diagnóstico preventivo.',
      en: 'Therapy applying pressure to specific points on feet, hands or ears corresponding to body organs. Based on the principle that the whole body is mapped in these extremities. Excellent for relaxation and preventive diagnosis.',
      es: 'Terapia que aplica presión en puntos específicos de los pies, manos u orejas que corresponden a órganos del cuerpo. Se basa en el principio de que todo el cuerpo está mapeado en estas extremidades. Excelente para relajación y diagnóstico preventivo.',
      zh: '在对应身体器官的脚、手或耳朵特定点施加压力的疗法。基于全身映射在这些肢体上的原理。'
    },
    indications: {
      pt: ['Estresse e ansiedade', 'Problemas digestivos', 'Desequilíbrios hormonais', 'Insônia', 'Dores de cabeça', 'Cansaço nas pernas e pés', 'Estímulo da circulação sanguínea'],
      en: ['Stress and anxiety', 'Digestive issues', 'Hormonal imbalances', 'Insomnia', 'Headaches', 'Leg and foot fatigue', 'Blood circulation stimulation'],
      es: ['Estrés y ansiedad', 'Problemas digestivos', 'Desequilibrios hormonales', 'Insomnio', 'Dolores de cabeza', 'Cansancio en piernas y pies', 'Estímulo de la circulación sanguínea'],
      zh: ['压力', '消化问题', '荷尔蒙失调', '失眠', '头痛', '腿部疲劳', '血液循环']
    },
    indicationTags: ['pés', 'mapa', 'relaxamento', 'toque', 'pontos'],
    contraindications: {
      pt: ['Trombose venosa profunda', 'Feridas abertas nos pés', 'Fraturas nos pés ou tornozelos', 'Gravidez (evitar pontos estimulantes de útero)', 'Infecções fúngicas contagiosas'],
      en: ['Deep vein thrombosis', 'Open foot wounds', 'Foot or ankle fractures', 'Pregnancy (avoid uterine stimulant points)', 'Contagious fungal infections'],
      es: ['Trombosis venosa profunda', 'Heridas abiertas en los pies', 'Fracturas de pies o tobillos', 'Embarazo (evitar puntos estimulantes uterinos)', 'Infecciones fúngicas contagiosas'],
      zh: ['深静脉血栓', '足部伤口', '足部骨折', '怀孕（子宫穴位）', '真菌感染']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1552196881-acf8b77b6407?w=600&h=400&fit=crop'
  },
  {
    id: 'shiatsu',
    name: { 
      pt: 'Shiatsu', 
      en: 'Shiatsu', 
      es: 'Shiatsu', 
      zh: '指压' 
    },
    category: 'body',
    description: {
      pt: 'Terapia manual japonesa que utiliza a pressão dos dedos, palmas e cotovelos em pontos de acupuntura. Busca harmonizar o fluxo de energia (Ki) e corrigir disfunções internas. A sessão é geralmente feita no chão, sobre um tatame, com o paciente vestido.',
      en: 'Japanese manual therapy using finger, palm and elbow pressure on acupuncture points. Seeks to harmonize energy flow (Ki) and correct internal dysfunctions. Sessions typically done on the floor, on a mat, with patient clothed.',
      es: 'Terapia manual japonesa que utiliza presión de dedos, palmas y codos en puntos de acupuntura. Busca armonizar el flujo de energía (Ki) y corregir disfunciones internas. La sesión se realiza generalmente en el suelo, sobre una colchoneta, con el paciente vestido.',
      zh: '日本手法疗法，使用手指、手掌和肘部按压针灸穴位。旨在协调能量流（Ki）并纠正内部功能障碍。'
    },
    indications: {
      pt: ['Dores musculares e tensão', 'Estresse e fadiga', 'Insônia', 'Problemas respiratórios', 'Dores de cabeça', 'Má digestão', 'Cólicas menstruais'],
      en: ['Muscle pain and tension', 'Stress and fatigue', 'Insomnia', 'Respiratory issues', 'Headaches', 'Poor digestion', 'Menstrual cramps'],
      es: ['Dolor muscular y tensión', 'Estrés y fatiga', 'Insomnio', 'Problemas respiratorios', 'Dolores de cabeza', 'Mala digestión', 'Cólicos menstruales'],
      zh: ['肌肉痛', '压力', '失眠', '呼吸问题', '头痛', '消化不良', '痛经']
    },
    indicationTags: ['energia', 'japonesa', 'pressão', 'relaxamento', 'meridianos'],
    contraindications: {
      pt: ['Inflamações agudas', 'Febre alta', 'Doenças contagiosas', 'Feridas abertas', 'Osteoporose severa', 'Câncer (requer autorização médica)'],
      en: ['Acute inflammation', 'High fever', 'Contagious diseases', 'Open wounds', 'Severe osteoporosis', 'Cancer (requires medical authorization)'],
      es: ['Inflamaciones agudas', 'Fiebre alta', 'Enfermedades contagiosas', 'Heridas abiertas', 'Osteoporosis severa', 'Cáncer (requiere autorización médica)'],
      zh: ['急性炎症', '高烧', '传染病', '开放性伤口', '严重骨质疏松症', '癌症']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop'
  },
  {
    id: 'access-consciousness',
    name: { 
      pt: 'Access Consciousness', 
      en: 'Access Consciousness', 
      es: 'Access Consciousness', 
      zh: '通道意识' 
    },
    category: 'energy',
    description: {
      pt: 'Processo de libertação transformativo que utiliza técnicas proprioceptivas e energéticas para dissolver crenças limitantes. As técnicas incluem "Bars" (32 pontos na cabeça) que liberam estresse acumulado. Promove maior consciência, leveza e criatividade na vida.',
      en: 'Transformative liberation process using proprioceptive and energetic techniques to dissolve limiting beliefs. Techniques include "Bars" (32 head points) that release accumulated stress. Promotes greater awareness, lightness and creativity in life.',
      es: 'Proceso transformativo de liberación que utiliza técnicas propioceptivas y energéticas para disolver creencias limitantes. Las técnicas incluyen "Barras" (32 puntos de la cabeza) que liberan el estrés acumulado. Promueve mayor conciencia, ligereza y creatividad.',
      zh: '利用本体感觉和能量技术解散限制性信念的变革性解放过程。包括释放压力的"栏杆"技术。'
    },
    indications: {
      pt: ['Crenças limitantes sobre a vida', 'Travamentos emocionais', 'Falta de clareza nas decisões', 'Stress elevado', 'Busca por transformação pessoal', 'Depressão leve a moderada', 'Criatividade bloqueada'],
      en: ['Limiting beliefs', 'Emotional blocks', 'Lack of clarity', 'High stress', 'Personal transformation', 'Mild depression', 'Blocked creativity'],
      es: ['Creencias limitantes', 'Bloqueos emocionales', 'Falta de claridad', 'Estrés elevado', 'Transformación personal', 'Depresión leve', 'Creatividad bloqueada'],
      zh: ['限制性信念', '情绪阻滞', '缺乏清晰度', '高压', '个人转变', '轻度抑郁', '创意阻滞']
    },
    indicationTags: ['consciência', 'energia', 'crenças', 'transformação', 'libertação'],
    contraindications: {
      pt: ['Transtornos psiquiátricos graves em crise', 'Resistência extrema à mudança', 'Pacientes muito desconfiados', 'Esquizofrenia ativa', 'Desejo de "arrumar" alguém contra sua vontade'],
      en: ['Serious psychiatric crisis', 'Extreme resistance to change', 'Very distrustful patients', 'Active schizophrenia', 'Desire to "fix" someone against their will'],
      es: ['Crisis psiquiátrica grave', 'Resistencia extrema al cambio', 'Pacientes muy desconfiados', 'Esquizofrenia activa', 'Deseo de "arreglar" a alguien contra su voluntad'],
      zh: ['严重精神病危机', '极度抵制变化', '非常不信任', '活跃性精神分裂', '强行改变他人']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop'
  },
  {
    id: 'alinhamento-energetico',
    name: { 
      pt: 'Alinhamento Energético', 
      en: 'Energy Alignment', 
      es: 'Alineación Energética', 
      zh: '能量对齐' 
    },
    category: 'energy',
    description: {
      pt: 'Terapia que sincroniza os corpos energéticos do indivíduo com sua essência espiritual. Utiliza técnicas de respiração, visualização e canalização de energia. O objetivo é restaurar a harmonia entre corpo físico, emocional e energético, aumentando a vitalidade e propósito.',
      en: 'Therapy that synchronizes individual\'s energy bodies with spiritual essence. Uses breathing, visualization and energy channeling techniques. Goal is to restore harmony between physical, emotional and energy bodies.',
      es: 'Terapia que sincroniza los cuerpos energéticos del individuo con su esencia espiritual. Utiliza técnicas de respiración, visualización y canalización de energía. El objetivo es restaurar la armonía entre cuerpos físico, emocional y energético.',
      zh: '将个人的能量身体与精神本质同步的疗法。使用呼吸、可视化和能量引导技术。'
    },
    indications: {
      pt: ['Desequilíbrio energético geral', 'Baixa vitalidade', 'Falta de propósito', 'Desalinhamento com objetivos de vida', 'Sensação de fragmentação interna', 'Busca espiritual', 'Aceleração do autoconhecimento'],
      en: ['General energy imbalance', 'Low vitality', 'Lack of purpose', 'Misalignment with life goals', 'Internal fragmentation', 'Spiritual seeking', 'Accelerated self-knowledge'],
      es: ['Desequilibrio energético general', 'Baja vitalidad', 'Falta de propósito', 'Desalineación con objetivos de vida', 'Sensación de fragmentación interna', 'Búsqueda espiritual', 'Aceleración del autoconocimiento'],
      zh: ['能量失衡', '生命力低下', '缺乏目的', '目标不对齐', '内部碎片化', '灵性追求', '自我认识加速']
    },
    indicationTags: ['energia', 'espiritual', 'alinhamento', 'propósito', 'vitalidade'],
    contraindications: {
      pt: ['Transtornos de personalidade severos', 'Desejo obsessivo por controle externo', 'Fé religiosa conflitante muito rígida', 'Alucinações ativas', 'Estado maníaco'],
      en: ['Severe personality disorders', 'Obsessive desire for external control', 'Rigid conflicting religious faith', 'Active hallucinations', 'Manic state'],
      es: ['Trastornos de personalidad severos', 'Deseo obsesivo de control externo', 'Fe religiosa rígida y conflictiva', 'Alucinaciones activas', 'Estado maníaco'],
      zh: ['严重人格障碍', '执着控制欲', '宗教信仰冲突', '幻觉', '躁狂状态']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1517511620798-cdc3fbaa9900?w=600&h=400&fit=crop'
  },
  {
    id: 'reiki',
    name: { 
      pt: 'Reiki', 
      en: 'Reiki', 
      es: 'Reiki', 
      zh: '灵气' 
    },
    category: 'energy',
    description: {
      pt: 'Prática de cura energética japonesa que utiliza a imposição de mãos para canalizar energia universal. O terapeuta coloca as mãos sobre o corpo do cliente para ativar o processo natural de cicatrização. É um processo muito relaxante que promove equilíbrio e bem-estar.',
      en: 'Japanese energy healing practice using hand placement to channel universal energy. Therapist places hands on client\'s body to activate natural healing process. Very relaxing process promoting balance and wellbeing.',
      es: 'Práctica de curación energética japonesa que utiliza la imposición de manos para canalizar energía universal. El terapeuta coloca las manos sobre el cuerpo del cliente para activar el proceso natural de cicatrización. Es un proceso muy relajante que promueve equilibrio y bienestar.',
      zh: '利用手部放置引导宇宙能量的日本能量治疗实践。非常放松且促进平衡和幸福感。'
    },
    indications: {
      pt: ['Stress e ansiedade', 'Dores crônicas', 'Recuperação pós-cirúrgica', 'Insônia', 'Desequilíbrios emocionais', 'Baixa imunidade', 'Busca espiritual'],
      en: ['Stress and anxiety', 'Chronic pain', 'Post-surgical recovery', 'Insomnia', 'Emotional imbalances', 'Low immunity', 'Spiritual seeking'],
      es: ['Estrés y ansiedad', 'Dolor crónico', 'Recuperación posquirúrgica', 'Insomnio', 'Desequilibrios emocionales', 'Baja inmunidad', 'Búsqueda espiritual'],
      zh: ['压力', '慢性疼痛', '术后恢复', '失眠', '情绪失衡', '免疫力低', '灵性追求']
    },
    indicationTags: ['energia', 'relaxamento', 'imposição', 'cura', 'bem-estar'],
    contraindications: {
      pt: ['Muito poucas contraindicações - é uma terapia suave', 'Pacientes muito céticos podem bloquear a abertura energética', 'Desconfiança extrema', 'Resistência à experiência', 'Pode intensificar sintomas em crise psicótica (requer monitoramento)'],
      en: ['Very few contraindications - very gentle therapy', 'Very skeptical patients may block energy opening', 'Extreme distrust', 'Resistance to experience', 'May intensify psychotic symptoms (monitoring required)'],
      es: ['Muy pocas contraindicaciones - terapia muy suave', 'Pacientes muy escépticos pueden bloquear la apertura energética', 'Desconfianza extrema', 'Resistencia a la experiencia', 'Puede intensificar síntomas psicóticos (requiere monitoreo)'],
      zh: ['禁忌很少', '怀疑态度', '极度不信任', '抵制', '可能强化精神症状']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2938d?w=600&h=400&fit=crop'
  },
  {
    id: 'thetahealing',
    name: { 
      pt: 'ThetaHealing', 
      en: 'ThetaHealing', 
      es: 'ThetaHealing', 
      zh: 'θ波疗法' 
    },
    category: 'energy',
    description: {
      pt: 'Processo de meditação guiada que atinge a onda cerebral Theta para acesso a crenças profundas e inconscientes. A sessão visa identificar e reprogramar crenças negativas, bloqueios energéticos e traumas. É aplicável para qualquer aspecto da vida que necessite mudança.',
      en: 'Guided meditation process reaching Theta brain wave to access deep unconscious beliefs. Session aims to identify and reprogram negative beliefs, energy blocks and trauma. Applicable for any life aspect needing change.',
      es: 'Proceso de meditación guiada que alcanza la onda cerebral Theta para acceder a creencias profundas e inconscientes. La sesión tiene como objetivo identificar y reprogramar creencias negativas, bloqueos energéticos y trauma. Es aplicable para cualquier aspecto de la vida que necesite cambio.',
      zh: '达到θ脑波以访问深层无意识信念的冥想过程。会议旨在识别和重新编程负面信念、能量阻滞和创伤。'
    },
    indications: {
      pt: ['Crenças limitantes profundas', 'Padrões repetitivos de autossabotagem', 'Traumas psicológicos', 'Bloqueios na prosperidade', 'Relacionamentos disfuncionais', 'Problemas de autoestima', 'Abusos passados'],
      en: ['Deep limiting beliefs', 'Repetitive self-sabotage patterns', 'Psychological trauma', 'Prosperity blocks', 'Dysfunctional relationships', 'Low self-esteem', 'Past abuse'],
      es: ['Creencias limitantes profundas', 'Patrones repetitivos de autosabotaje', 'Trauma psicológico', 'Bloqueos de prosperidad', 'Relaciones disfuncionales', 'Baja autoestima', 'Abuso pasado'],
      zh: ['深层限制性信念', '自我破坏模式', '心理创伤', '繁荣阻滞', '功能失调的关系', '低自尊', '过去创伤']
    },
    indicationTags: ['teta', 'crenças', 'programação', 'consciente', 'trauma'],
    contraindications: {
      pt: ['Transtornos psiquiátricos graves em crise aguda', 'Ausência de desejo genuíno de mudança', 'Fé religiosa rigidamente conflitante', 'Psicose ativa', 'Transtorno bipolar em fase maníaca'],
      en: ['Serious psychiatric crisis', 'Lack of genuine desire for change', 'Rigidly conflicting religious faith', 'Active psychosis', 'Bipolar disorder manic phase'],
      es: ['Crisis psiquiátrica grave', 'Falta de deseo genuino de cambio', 'Fe religiosa rígidamente conflictiva', 'Psicosis activa', 'Trastorno bipolar fase maníaca'],
      zh: ['严重精神病危机', '缺乏真正的改变欲望', '宗教冲突', '活跃精神病', '躁狂双相障碍']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop'
  },
  {
    id: 'arteterapia',
    name: { 
      pt: 'Arteterapia', 
      en: 'Art Therapy', 
      es: 'Arteterapia', 
      zh: '艺术治疗' 
    },
    category: 'mind',
    description: {
      pt: 'Processo terapêutico que utiliza a criatividade artística como ferramenta de expressão e cura. O cliente desenha, pinta, esculpe ou faz colagens para explorar emoções, traumas e potencialidades. Não é necessário talento artístico - o foco é no processo, não na obra final.',
      en: 'Therapeutic process using artistic creativity as tool for expression and healing. Client draws, paints, sculpts or makes collages to explore emotions, trauma and potential. No artistic talent needed - focus is on process, not final product.',
      es: 'Proceso terapéutico que utiliza la creatividad artística como herramienta de expresión y curación. El cliente dibuja, pinta, esculpe o hace collages para explorar emociones, traumas y potencialidades. No es necesario talento artístico - el enfoque está en el proceso.',
      zh: '利用艺术创意作为表达和治疗工具的治疗过程。专注于过程而非最终作品。'
    },
    indications: {
      pt: ['Traumas emocionais', 'Dificuldade em expressar sentimentos verbalmente', 'Ansiedade e depressão', 'Problemas de comportamento em crianças', 'Falta de criatividade', 'Autoconhecimento emocional', 'Luto e perdas'],
      en: ['Emotional trauma', 'Difficulty expressing feelings verbally', 'Anxiety and depression', 'Behavioral problems in children', 'Lack of creativity', 'Emotional self-knowledge', 'Grief and loss'],
      es: ['Trauma emocional', 'Dificultad para expresar sentimientos verbalmente', 'Ansiedad y depresión', 'Problemas de comportamiento en niños', 'Falta de creatividad', 'Autoconocimiento emocional', 'Duelo y pérdidas'],
      zh: ['情绪创伤', '言语表达困难', '焦虑和抑郁', '儿童行为问题', '缺乏创意', '情感自知', '悲伤和损失']
    },
    indicationTags: ['criatividade', 'expressão', 'emoção', 'arte', 'cura'],
    contraindications: {
      pt: ['Psicose ativa (perda de contato com realidade)', 'Alucinações visuais intensas', 'Agitação extrema', 'Transtorno obsessivo-compulsivo grave', 'Pacientes muito críticos consigo mesmos (podem recusar praticar)'],
      en: ['Active psychosis', 'Intense visual hallucinations', 'Extreme agitation', 'Severe OCD', 'Patients highly self-critical (may refuse to participate)'],
      es: ['Psicosis activa', 'Alucinaciones visuales intensas', 'Agitación extrema', 'TOC grave', 'Pacientes muy autocríticos (pueden negarse a participar)'],
      zh: ['活跃精神病', '强烈视幻觉', '极度躁动', '严重强迫症', '高度自我批评']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1536912249291-4e5db5ff6f1a?w=600&h=400&fit=crop'
  },
  {
    id: 'constelacao-familiar',
    name: { 
      pt: 'Constelação Familiar', 
      en: 'Family Constellation', 
      es: 'Constelación Familiar', 
      zh: '家族系统排列' 
    },
    category: 'mind',
    description: {
      pt: 'Método fenomenológico que visa resolver bloqueios pessoais através da representação de pessoas significativas do sistema familiar. Utiliza psicodrama com representantes para revelar dinâmicas ocultas e deslealdades sistêmicas. A solução é encontrada quando a ordem e o respeito são restabelecidos.',
      en: 'Phenomenological method resolving personal blocks through representation of significant family system members. Uses psychodrama with representatives to reveal hidden dynamics and systemic entanglements. Solution found when order and respect restored.',
      es: 'Método fenomenológico que busca resolver bloqueos personales a través de la representación de personas significativas del sistema familiar. Utiliza psicodrama con representantes para revelar dinámicas ocultas. La solución se encuentra cuando se restablece el orden y respeto.',
      zh: '通过代表家庭系统中的重要人物来解决个人障碍的现象学方法。使用心理剧来揭示隐藏的动态。'
    },
    indications: {
      pt: ['Conflitos familiares não resolvidos', 'Bloqueios em relacionamentos', 'Dificuldades de prosperidade', 'Problemas de identidade pessoal', 'Síndrome de lealdade familiar tóxica', 'Padrões repetidos de fracasso', 'Culpa e ressentimento herdados'],
      en: ['Unresolved family conflicts', 'Relationship blocks', 'Prosperity difficulties', 'Identity problems', 'Toxic family loyalty syndrome', 'Repeated failure patterns', 'Inherited guilt and resentment'],
      es: ['Conflictos familiares no resueltos', 'Bloqueos en relaciones', 'Dificultades de prosperidad', 'Problemas de identidad personal', 'Síndrome de lealtad familiar tóxica', 'Patrones repetidos de fracaso', 'Culpa y resentimiento heredados'],
      zh: ['未解决的家族冲突', '关系阻滞', '繁荣困难', '身份认同问题', '有毒的家族忠诚', '失败模式重复', '继承的罪恶感']
    },
    indicationTags: ['família', 'sistema', 'lealdade', 'dinâmica', 'resolução'],
    contraindications: {
      pt: ['Pacientes em crise psicótica ativa', 'Resistência extrema ao trabalho', 'Abuso sexual grave não processado', 'Transtornos de personalidade com falta de empatia', 'Recusa em aceitar a representação como simbólica'],
      en: ['Patients in active psychotic crisis', 'Extreme resistance to work', 'Unprocessed severe sexual abuse', 'Personality disorders lacking empathy', 'Refusal to accept representation as symbolic'],
      es: ['Pacientes en crisis psicótica activa', 'Resistencia extrema al trabajo', 'Abuso sexual grave no procesado', 'Trastornos de personalidad sin empatía', 'Negación a aceptar la representación como simbólica'],
      zh: ['活跃精神病危机', '极端抵制', '严重未处理的创伤', '缺乏同理心的人格障碍', '拒绝接受象征']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop'
  },
  {
    id: 'hipnoterapia',
    name: { 
      pt: 'Hipnoterapia', 
      en: 'Hypnotherapy', 
      es: 'Hipnoterapia', 
      zh: '催眠治疗' 
    },
    category: 'mind',
    description: {
      pt: 'Terapia que utiliza hipnose para acessar o inconsciente e reestruturar padrões de pensamento. O hipnoterapeuta guia o cliente para um estado de relaxamento profundo onde sugestões terapêuticas são mais eficazes. Excelente para hábitos, fobias e bloqueios emocionais.',
      en: 'Therapy using hypnosis to access unconscious and restructure thought patterns. Hypnotherapist guides client into deep relaxation where therapeutic suggestions are more effective. Excellent for habits, phobias and emotional blocks.',
      es: 'Terapia que utiliza hipnosis para acceder al inconsciente y reestructurar patrones de pensamiento. El hipnoterapeuta guía al cliente a un estado de relajación profunda donde las sugestiones terapéuticas son más efectivas. Excelente para hábitos, fobias y bloqueios emocionales.',
      zh: '利用催眠访问无意识和重组思维模式的疗法。引导进入深度放松状态，治疗建议更有效。'
    },
    indications: {
      pt: ['Fobias e medos', 'Vícios (fumo, álcool)', 'Perda de peso', 'Problemas de sono', 'Ansiedade performática', 'Traumas', 'Baixa autoestima'],
      en: ['Phobias and fears', 'Addictions (smoking, alcohol)', 'Weight loss', 'Sleep problems', 'Performance anxiety', 'Trauma', 'Low self-esteem'],
      es: ['Fobias y miedos', 'Adicciones (tabaco, alcohol)', 'Pérdida de peso', 'Problemas de sueño', 'Ansiedad de rendimiento', 'Trauma', 'Baja autoestima'],
      zh: ['恐惧症', '成瘾', '减肥', '睡眠问题', '表现焦虑', '创伤', '低自尊']
    },
    indicationTags: ['hipnose', 'inconsciente', 'sugestão', 'hábitos', 'padrões'],
    contraindications: {
      pt: ['Psicose ativa', 'Epilepsia (requer autorização médica)', 'Recusa em entrar em transe', 'Transtorno dissociativo grave', 'Falta de confiança no terapeuta', 'Uso ativo de substâncias'],
      en: ['Active psychosis', 'Epilepsy (requires medical approval)', 'Refusal to enter trance', 'Severe dissociative disorder', 'Lack of therapist trust', 'Active substance use'],
      es: ['Psicosis activa', 'Epilepsia (requiere aprobación médica)', 'Rechazo a entrar en trance', 'Trastorno disociativo grave', 'Falta de confianza en el terapeuta', 'Uso activo de sustancias'],
      zh: ['活跃精神病', '癫痫', '拒绝进入催眠', '严重解离障碍', '对治疗师不信任', '物质滥用']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1564121211835-e88c852648c0?w=600&h=400&fit=crop'
  },
  {
    id: 'meditacao',
    name: { 
      pt: 'Meditação', 
      en: 'Meditation', 
      es: 'Meditación', 
      zh: '冥想' 
    },
    category: 'mind',
    description: {
      pt: 'Prática milenar de treinar a mente para alcançar clareza, calma e presença. Existem diversas técnicas (concentração, atenção plena, mantras, visualização). A meditação regular reduz stress, melhora a saúde mental e amplia a percepção do presente. Pode ser feita individualmente ou em grupo.',
      en: 'Ancient practice of training mind to achieve clarity, calm and presence. Various techniques (concentration, mindfulness, mantras, visualization). Regular meditation reduces stress, improves mental health and expands present moment awareness.',
      es: 'Práctica milenaria de entrenar la mente para lograr claridad, calma y presencia. Existen diversas técnicas (concentración, atención plena, mantras, visualización). La meditación regular reduce el estrés, mejora la salud mental y amplía la percepción del presente.',
      zh: '训练心灵达到清晰、平静和觉知的古老实践。各种技术（专注、正念、咒语、可视化）。'
    },
    indications: {
      pt: ['Stress e ansiedade', 'Insônia e dificuldade de concentração', 'Hipertensão arterial', 'Busca espiritual', 'Autoconhecimento', 'Inteligência emocional', 'Proteção mental'],
      en: ['Stress and anxiety', 'Insomnia and concentration difficulty', 'High blood pressure', 'Spiritual seeking', 'Self-knowledge', 'Emotional intelligence', 'Mental protection'],
      es: ['Estrés y ansiedad', 'Insomnio y dificultad de concentración', 'Hipertensión arterial', 'Búsqueda espiritual', 'Autoconocimiento', 'Inteligencia emocional', 'Protección mental'],
      zh: ['压力和焦虑', '失眠和专注困难', '高血压', '灵性追求', '自我认识', '情感智力', '心理保护']
    },
    indicationTags: ['mente', 'presença', 'calma', 'clareza', 'espírito'],
    contraindications: {
      pt: ['Alucinações ativas', 'Psicose em descompensação', 'Depressão severa com pensamentos suicidas', 'Impaciência extrema (alguns pacientes ficam mais ansiosos)', 'Transtorno de conversão'],
      en: ['Active hallucinations', 'Decompensated psychosis', 'Severe depression with suicidal thoughts', 'Extreme impatience (some get more anxious)', 'Conversion disorder'],
      es: ['Alucinaciones activas', 'Psicosis descompensada', 'Depresión severa con pensamientos suicidas', 'Impaciencia extrema', 'Trastorno de conversión'],
      zh: ['活跃幻觉', '失控精神病', '严重抑郁与自杀观念', '极端不耐烦', '转换障碍']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop'
  },
  {
    id: 'aromaterapia',
    name: { 
      pt: 'Aromaterapia', 
      en: 'Aromatherapy', 
      es: 'Aromaterapia', 
      zh: '芳香疗法' 
    },
    category: 'natural',
    description: {
      pt: 'Prática que utiliza óleos essenciais para equilibrar corpo, mente e emoções. Os óleos são absorvidos via olfato e pele, ativando o sistema límbico e estimulando processos de cicatrização. Cada óleo tem propriedades específicas (relaxamento, energização, limpeza, etc).',
      en: 'Practice using essential oils to balance body, mind and emotions. Oils absorbed via smell and skin, activating limbic system and stimulating healing processes. Each oil has specific properties (relaxation, energization, cleansing, etc).',
      es: 'Práctica que utiliza aceites esenciales para equilibrar cuerpo, mente y emociones. Los aceites se absorben vía olfato y piel, activando el sistema límbico. Cada aceite tiene propiedades específicas (relajación, energización, limpieza, etc).',
      zh: '利用精油平衡身体、心灵和情感的实践。通过气味和皮肤吸收。每种油都有特定功效。'
    },
    indications: {
      pt: ['Stress e insônia', 'Falta de energia', 'Problemas de pele', 'Resfriados e tosse', 'Dores de cabeça', 'Relaxamento muscular', 'Proteção imunológica'],
      en: ['Stress and insomnia', 'Lack of energy', 'Skin problems', 'Colds and cough', 'Headaches', 'Muscle relaxation', 'Immune protection'],
      es: ['Estrés e insomnio', 'Falta de energía', 'Problemas de piel', 'Resfriados y tos', 'Dolores de cabeza', 'Relajación muscular', 'Protección inmunológica'],
      zh: ['压力和失眠', '缺乏能量', '皮肤问题', '感冒和咳嗽', '头痛', '肌肉放松', '免疫保护']
    },
    indicationTags: ['óleos', 'aromas', 'olfato', 'bem-estar', 'natural'],
    contraindications: {
      pt: ['Alergia a óleos essenciais', 'Gravidez em primeiro trimestre (alguns óleos são abortivos)', 'Alergias respiratórias severas', 'Asma (pode ser provocada por vapores)', 'Pele muito sensível ou ferida'],
      en: ['Essential oil allergies', 'First trimester pregnancy (some oils are abortifacient)', 'Severe respiratory allergies', 'Asthma (vapor may trigger)', 'Very sensitive or injured skin'],
      es: ['Alergia a aceites esenciales', 'Primer trimestre de embarazo (algunos aceites son abortivos)', 'Alergias respiratorias severas', 'Asma (puede ser provocada por vapores)', 'Piel muy sensible o herida'],
      zh: ['精油过敏', '怀孕初期', '严重呼吸过敏', '哮喘', '皮肤敏感或受伤']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop'
  },
  {
    id: 'fitoterapia',
    name: { 
      pt: 'Fitoterapia', 
      en: 'Herbal Medicine', 
      es: 'Fitoterpia', 
      zh: '草本疗法' 
    },
    category: 'natural',
    description: {
      pt: 'Sistema de cura baseado no uso medicinal de plantas. Os fitoterápicos podem ser preparados como chás, tinturas, óleos ou extratos. Cada planta contém componentes ativos que tratam condições específicas. É preventiva e curativa, sempre respeitando a capacidade regenerativa do corpo.',
      en: 'Healing system based on medicinal use of plants. Herbal preparations can be teas, tinctures, oils or extracts. Each plant contains active components treating specific conditions. Preventive and curative, respecting body\'s regenerative capacity.',
      es: 'Sistema de curación basado en el uso medicinal de plantas. Los fitofármacos pueden prepararse como infusiones, tinturas, aceites o extractos. Cada planta contiene componentes activos que tratan condiciones específicas. Es preventiva y curativa.',
      zh: '基于植物药物使用的治疗系统。草本制剂可制成茶、酊剂、油或提取物。每种植物含有活性成分治疗特定条件。'
    },
    indications: {
      pt: ['Problemas digestivos', 'Inflamação crônica', 'Problemas respiratórios', 'Desequilíbrios hormonais', 'Distúrbios do sono', 'Fadiga e exaustão', 'Fortalecimento imunológico'],
      en: ['Digestive problems', 'Chronic inflammation', 'Respiratory issues', 'Hormonal imbalances', 'Sleep disturbances', 'Fatigue and exhaustion', 'Immune strengthening'],
      es: ['Problemas digestivos', 'Inflamación crónica', 'Problemas respiratorios', 'Desequilibrios hormonales', 'Disturbios del sueño', 'Fatiga y agotamiento', 'Fortalecimiento inmunológico'],
      zh: ['消化问题', '慢性炎症', '呼吸问题', '荷尔蒙失调', '睡眠障碍', '疲劳', '免疫加强']
    },
    indicationTags: ['plantas', 'natural', 'curativo', 'preventivo', 'ervas'],
    contraindications: {
      pt: ['Alergia a plantas específicas', 'Uso concomitante de medicação que interage com a planta', 'Gravidez (muitas plantas são teratogênicas)', 'Insuficiência renal ou hepática severa', 'Lactação (algumas plantas são contra-indicadas)'],
      en: ['Plant allergies', 'Concomitant medication with plant interactions', 'Pregnancy (many plants are teratogenic)', 'Severe kidney or liver insufficiency', 'Lactation (some plants contraindicated)'],
      es: ['Alergia a plantas específicas', 'Medicación concomitante que interactúa', 'Embarazo (muchas plantas son teratogénicas)', 'Insuficiencia renal o hepática severa', 'Lactancia (algunas plantas contraindic adas)'],
      zh: ['植物过敏', '药物相互作用', '怀孕（致畸）', '肾脏或肝脏功能衰竭', '哺乳期']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=600&h=400&fit=crop'
  },
  {
    id: 'naturopatia',
    name: { 
      pt: 'Naturopatia', 
      en: 'Naturopathy', 
      es: 'Naturopatía', 
      zh: '自然疗法' 
    },
    category: 'natural',
    description: {
      pt: 'Filosofia e sistema de cura que utiliza meios naturais (alimentos, plantas, água, ar, luz) para restaurar e manter a saúde. Foca na causa raiz das doenças, não apenas nos sintomas. O naturopata prescreve mudanças de estilo de vida, dieta e suplementação para estimular a capacidade de autocura do corpo.',
      en: 'Philosophy and healing system using natural means (foods, plants, water, air, light) to restore and maintain health. Focuses on root cause of disease. Naturopath prescribes lifestyle changes, diet and supplementation to stimulate body\'s self-healing ability.',
      es: 'Filosofía y sistema de curación que utiliza medios naturales (alimentos, plantas, agua, aire, luz) para restaurar y mantener la salud. Se centra en la causa raíz de las enfermedades. El naturópata prescribe cambios de estilo de vida, dieta y suplementación.',
      zh: '利用自然手段（食物、植物、水、空气、光线）来恢复和维持健康的哲学和治疗系统。'
    },
    indications: {
      pt: ['Prevenção de doenças', 'Recuperação de energía vital', 'Equilibrio hormonal', 'Problemas dermatológicos', 'Digestão lenta', 'Fragilidade imunológica', 'Desintoxicação corporal'],
      en: ['Disease prevention', 'Recovery of vital energy', 'Hormonal balance', 'Dermatological problems', 'Slow digestion', 'Immune fragility', 'Body detoxification'],
      es: ['Prevención de enfermedades', 'Recuperación de energía vital', 'Equilibrio hormonal', 'Problemas dermatológicos', 'Digestión lenta', 'Fragilidad inmunológica', 'Desintoxicación corporal'],
      zh: ['疾病预防', '生命力恢复', '荷尔蒙平衡', '皮肤问题', '消化缓慢', '免疫脆弱', '排毒']
    },
    indicationTags: ['natural', 'preventivo', 'estilo', 'vida', 'detox'],
    contraindications: {
      pt: ['Doenças agudas que requerem intervenção médica urgente', 'Apendicite, inflamações abdominais agudas', 'Intoxicações alimentares severas', 'Condições que necessitam cirurgia', 'Medicação psiquiátrica que não pode ser interrompida'],
      en: ['Acute diseases requiring urgent medical intervention', 'Appendicitis, acute abdominal inflammation', 'Severe food poisoning', 'Conditions requiring surgery', 'Psychiatric medication that cannot be stopped'],
      es: ['Enfermedades agudas que requieren intervención médica urgente', 'Apendicitis, inflamaciones abdominales agudas', 'Intoxicación alimentaria severa', 'Condiciones que necesitan cirugía', 'Medicación psiquiátrica que no puede interrumpirse'],
      zh: ['需要紧急医疗干预的急性病', '阑尾炎', '严重食物中毒', '需要手术的条件', '无法停止的精神药物']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1518611505868-48510c2e022c?w=600&h=400&fit=crop'
  },
  {
    id: 'jornada-xamanica',
    name: { 
      pt: 'Jornada Xamânica', 
      en: 'Shamanic Journey', 
      es: 'Viaje Chamánico', 
      zh: '萨满之旅' 
    },
    category: 'mind',
    description: {
      pt: 'Experiência meditativa guiada inspirada em práticas xamânicas que facilita acesso a sabedoria interior e guias espirituais. Utiliza ritmo de tambor e imaginação ativa. O cliente viaja internamente para encontrar respostas, cura e conexão com sua essência. Profundamente transformativa.',
      en: 'Guided meditative experience inspired by shamanic practices facilitating access to inner wisdom and spiritual guides. Uses drum rhythm and active imagination. Client travels internally to find answers, healing and connection with essence.',
      es: 'Experiencia meditativa guiada inspirada en prácticas chamánicas que facilita el acceso a la sabiduría interior y guías espirituales. Utiliza ritmo de tambor e imaginación activa. El cliente viaja internamente para encontrar respuestas, curación y conexión.',
      zh: '受萨满实践启发的引导冥想体验，促进访问内在智慧和精神指导。使用鼓声节奏和活跃想象。'
    },
    indications: {
      pt: ['Busca de respostas profundas', 'Recuperação de alma/trauma espiritual', 'Conexão com guias interiores', 'Propósito de vida bloqueado', 'Criatividade ou inspiração travada', 'Luto e perdas transcendentes', 'Integração de experiências espirituais'],
      en: ['Seeking deep answers', 'Soul recovery/spiritual trauma', 'Connection with inner guides', 'Blocked life purpose', 'Stuck creativity', 'Transcendent grief', 'Integration of spiritual experiences'],
      es: ['Búsqueda de respuestas profundas', 'Recuperación del alma/trauma espiritual', 'Conexión con guías interiores', 'Propósito de vida bloqueado', 'Creatividad o inspiración trabada', 'Duelo y pérdidas trascendentes', 'Integración de experiencias espirituales'],
      zh: ['寻求深层答案', '灵魂恢复', '与内在指导连接', '被阻挡的人生目的', '卡住的创意', '先验悲伤', '精神体验整合']
    },
    indicationTags: ['xamâ', 'jornada', 'sabedoria', 'espírito', 'cura'],
    contraindications: {
      pt: ['Psicose ativa', 'Tendência a confundir imaginação com realidade', 'Alucinações não tratadas', 'Transtorno dissociativo grave', 'Falta de âncora na realidade consensual'],
      en: ['Active psychosis', 'Tendency to confuse imagination with reality', 'Untreated hallucinations', 'Severe dissociative disorder', 'Lack of grounding in consensus reality'],
      es: ['Psicosis activa', 'Tendencia a confundir imaginación con realidad', 'Alucinaciones sin tratar', 'Trastorno disociativo grave', 'Falta de anclaje en la realidad consensual'],
      zh: ['活跃精神病', '混淆想象与现实', '未治疗幻觉', '严重解离障碍', '与现实脱节']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop'
  },
  {
    id: 'sound-healing',
    name: { 
      pt: 'Sound Healing', 
      en: 'Sound Healing', 
      es: 'Terapia de Sonido', 
      zh: '声音疗法' 
    },
    category: 'energy',
    description: {
      pt: 'Terapia que utiliza frequências sonoras e vibrações para equilibrar os chakras e reharmonizar o corpo energético. Pode envolver tigelas cantoras, diapasões, sinos tibetanos ou mantras. O som penetra profundamente nas células promovendo cura em níveis vibracionais.',
      en: 'Therapy using sound frequencies and vibrations to balance chakras and harmonize energy body. May involve singing bowls, tuning forks, Tibetan bells or mantras. Sound penetrates deeply into cells promoting vibrational healing.',
      es: 'Terapia que utiliza frecuencias sonoras y vibraciones para equilibrar los chakras y reharmonizar el cuerpo energético. Puede envolver cuencos cantores, diapasones, campanas tibetanas o mantras. El sonido penetra profundamente en las células.',
      zh: '利用声频和振动平衡脉轮和能量体的疗法。可能涉及唱碗、音叉、藏铃或咒语。'
    },
    indications: {
      pt: ['Desequilíbrio energético', 'Stress e tensão', 'Bloqueios energéticos', 'Busca de harmonia interior', 'Dores crônicas de origem vibracional', 'Despertar espiritual', 'Meditação profunda'],
      en: ['Energy imbalance', 'Stress and tension', 'Energy blocks', 'Inner harmony seeking', 'Chronic vibrational pain', 'Spiritual awakening', 'Deep meditation'],
      es: ['Desequilibrio energético', 'Estrés y tensión', 'Bloqueos energéticos', 'Búsqueda de armonía interior', 'Dolores crónicos de origen vibracional', 'Despertar espiritual', 'Meditación profunda'],
      zh: ['能量失衡', '压力', '能量阻滞', '内在和谐', '振动疼痛', '灵性觉醒', '深层冥想']
    },
    indicationTags: ['som', 'vibração', 'frequência', 'energia', 'harmonia'],
    contraindications: {
      pt: ['Surdez severa (em alguns tipos)', 'Sensibilidade auditiva extrema', 'Epilepsia fotossensível (se há componente luminoso)', 'Transtorno bipolar em fase maníaca', 'Rejeição total ao som/música'],
      en: ['Severe deafness (some types)', 'Extreme auditory sensitivity', 'Photosensitive epilepsy (if light component)', 'Bipolar manic phase', 'Total rejection of sound/music'],
      es: ['Sordera severa', 'Sensibilidad auditiva extrema', 'Epilepsia fotosensible (si hay componente luminoso)', 'Trastorno bipolar fase maníaca', 'Rechazo total al sonido/música'],
      zh: ['严重聋子', '听觉过敏', '光敏性癫痫', '躁狂双相障碍', '对声音拒绝']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop'
  },
  {
    id: 'do-in',
    name: { 
      pt: 'Do-In', 
      en: 'Do-In', 
      es: 'Do-In', 
      zh: '导引' 
    },
    category: 'body',
    description: {
      pt: 'Técnica de auto-massagem e alongamento da Medicina Tradicional Chinesa. O praticante aplica pressão em meridianos e pontos de acupuntura no próprio corpo. Estimula a circulação de Qi, melhora a flexibilidade e facilita auto-cura. Pode ser praticado diariamente como rotina preventiva.',
      en: 'Self-massage and stretching technique from Traditional Chinese Medicine. Practitioner applies pressure to meridians and acupuncture points on own body. Stimulates Qi circulation, improves flexibility and facilitates self-healing. Can be practiced daily as preventive routine.',
      es: 'Técnica de auto-masaje y estiramiento de la Medicina Tradicional China. El practicante aplica presión en meridianos y puntos de acupuntura en su propio cuerpo. Estimula la circulación de Qi, mejora la flexibilidad y facilita la auto-curación. Puede practicarse diariamente.',
      zh: '来自中医的自我按摩和拉伸技术。练习者在自己的身体上按压经络和穴位。刺激气流循环，改善灵活性。'
    },
    indications: {
      pt: ['Prevenção de doenças', 'Problemas de circulação', 'Rigidez articular', 'Baixa vitalidade', 'Problemas digestivos', 'Auto-empoderamento para saúde', 'Rotina de manutenção'],
      en: ['Disease prevention', 'Circulation problems', 'Joint stiffness', 'Low vitality', 'Digestive problems', 'Health self-empowerment', 'Maintenance routine'],
      es: ['Prevención de enfermedades', 'Problemas de circulación', 'Rigidez articular', 'Baja vitalidad', 'Problemas digestivos', 'Auto-empoderamiento para la salud', 'Rutina de mantenimiento'],
      zh: ['疾病预防', '循环问题', '关节僵硬', '生命力低', '消化问题', '健康自我赋权', '维护例程']
    },
    indicationTags: ['chinesa', 'auto-massagem', 'meridiano', 'preventivo', 'flexibilidade'],
    contraindications: {
      pt: ['Fraturas ou ossos quebrados recentes', 'Feridas abertas', 'Incapacidade de tocar o próprio corpo (amplitude de movimento severa)', 'Osteoporose muito avançada', 'Estados muito inflamados'],
      en: ['Recent fractures', 'Open wounds', 'Inability to touch own body (severe ROM restriction)', 'Advanced osteoporosis', 'Very inflamed states'],
      es: ['Fracturas recientes', 'Heridas abiertas', 'Incapacidad para tocarse a sí mismo (restricción ROM grave)', 'Osteoporosis muy avanzada', 'Estados muy inflamados'],
      zh: ['近期骨折', '开放性伤口', '无法触及自己身体', '晚期骨质疏松症', '高度炎症状态']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&h=400&fit=crop'
  },
  {
    id: 'feldenkrais',
    name: { 
      pt: 'Feldenkrais', 
      en: 'Feldenkrais Method', 
      es: 'Método Feldenkrais', 
      zh: '费登奎斯方法' 
    },
    category: 'body',
    description: {
      pt: 'Método educacional que melhora a qualidade do movimento e a consciência corporal. Através de movimentos lentos, suaves e conscientes, reprograma a neuromuscularidade. Beneficia pessoas com limitações, lesões ou simplesmente desejando otimizar seu movimento e postura. Não é exercício - é aprendizagem motora.',
      en: 'Educational method improving movement quality and body awareness. Through slow, gentle, conscious movements, reprograms neuromuscular system. Benefits people with limitations, injuries or seeking optimized movement and posture. Not exercise - motor learning.',
      es: 'Método educacional que mejora la calidad del movimiento y la conciencia corporal. A través de movimientos lentos, suaves y conscientes, reprograma la neuromuscularidad. Beneficia a personas con limitaciones, lesiones o que simplemente desean optimizar su movimiento y postura.',
      zh: '通过缓慢、温和、有意识的运动改善运动质量和身体意识的教育方法。重新编程神经肌肉系统。'
    },
    indications: {
      pt: ['Limitações de movimento', 'Reabilitação pós-lesão', 'Postura deficiente', 'Eficiência motora reduzida', 'Rigidez muscular', 'Dores crônicas musculoesqueléticas', 'Melhora de coordenação'],
      en: ['Movement limitations', 'Post-injury rehabilitation', 'Poor posture', 'Reduced motor efficiency', 'Muscle stiffness', 'Chronic musculoskeletal pain', 'Improved coordination'],
      es: ['Limitaciones de movimiento', 'Rehabilitación poslesión', 'Postura deficiente', 'Eficiencia motora reducida', 'Rigidez muscular', 'Dolores crónicos musculoesqueléticos', 'Mejora de coordinación'],
      zh: ['运动限制', '损伤后康复', '不良姿势', '运动效率降低', '肌肉僵硬', '慢性肌肉骨骼疼痛', '协调改进']
    },
    indicationTags: ['movimento', 'consciência', 'postura', 'educação', 'motora'],
    contraindications: {
      pt: ['Inflamação aguda severa', 'Fraturas consolidando (muito recentes)', 'Falta total de interesse em aprender (o método requer participação ativa)', 'Transtorno cognitivo severo que impede aprendizagem', 'Incapacidade de seguir instruções'],
      en: ['Severe acute inflammation', 'Consolidating fractures (very recent)', 'Total lack of interest in learning (requires active participation)', 'Severe cognitive disorder preventing learning', 'Inability to follow instructions'],
      es: ['Inflamación aguda severa', 'Fracturas consolidando (muy recientes)', 'Falta total de interés en aprender (requiere participación activa)', 'Trastorno cognitivo severo que impide aprendizaje', 'Incapacidad para seguir instrucciones'],
      zh: ['严重急性炎症', '近期骨折', '缺乏学习兴趣', '严重认知障碍', '无法跟随指示']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop'
  },
  {
    id: 'fisioterapia-integrativa',
    name: { 
      pt: 'Fisioterapia Integrativa', 
      en: 'Integrative Physiotherapy', 
      es: 'Fisioterapia Integrativa', 
      zh: '综合物理治疗' 
    },
    category: 'body',
    description: {
      pt: 'Abordagem fisioterapêutica que combina técnicas convencionais (exercício, mobilização) com práticas holísticas (respiração, visualização, acupuntura). Visa recuperação funcional considerando o ser como um todo integrado. Recupera mobilidade, força e qualidade de vida com menos efeitos adversos.',
      en: 'Physiotherapy approach combining conventional techniques (exercise, mobilization) with holistic practices (breathing, visualization, acupuncture). Aims for functional recovery considering integrated whole being. Recovers mobility, strength and quality of life with fewer adverse effects.',
      es: 'Enfoque fisioterapéutico que combina técnicas convencionales (ejercicio, movilización) con prácticas holísticas (respiración, visualización, acupuntura). Busca recuperación funcional considerando al ser como un todo integrado. Recupera movilidad, fuerza y calidad de vida.',
      zh: '结合传统技术和全面实践的物理治疗方法。旨在考虑整体的功能恢复。'
    },
    indications: {
      pt: ['Recuperação pós-operatória', 'Lesões esportivas', 'Dores crônicas musculoesqueléticas', 'Reabilitação neurológica', 'Melhora de mobilidade', 'Fortalecimento muscular', 'Prevenção de recidivas'],
      en: ['Post-operative recovery', 'Sports injuries', 'Chronic musculoskeletal pain', 'Neurological rehabilitation', 'Mobility improvement', 'Muscle strengthening', 'Recurrence prevention'],
      es: ['Recuperación posoperatoria', 'Lesiones deportivas', 'Dolores crónicos musculoesqueléticos', 'Rehabilitación neurológica', 'Mejora de movilidad', 'Fortalecimiento muscular', 'Prevención de recidivas'],
      zh: ['术后恢复', '运动损伤', '慢性肌肉骨骼疼痛', '神经康复', '活动能力改进', '肌肉强化', '预防复发']
    },
    indicationTags: ['fisio', 'movimento', 'recuperação', 'integrada', 'saúde'],
    contraindications: {
      pt: ['Inflamação muito aguda (requer estabilização médica primeiro)', 'Fraturas recentes sem consolidação', 'Câncer ativo em tratamento (requer liberação médica)', 'Síndrome da veia cava superior', 'Trombose em formação'],
      en: ['Very acute inflammation (requires medical stabilization first)', 'Recent non-consolidated fractures', 'Active cancer in treatment (requires medical clearance)', 'Superior vena cava syndrome', 'Forming thrombosis'],
      es: ['Inflamación muy aguda (requiere estabilización médica primero)', 'Fracturas recientes sin consolidación', 'Cáncer activo en tratamiento (requiere autorización médica)', 'Síndrome de vena cava superior', 'Trombosis en formación'],
      zh: ['非常急性炎症', '近期未愈合骨折', '活跃癌症治疗', '上腔静脉综合征', '正在形成的血栓']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop'
  },
  {
    id: 'massagem-ayurvedica',
    name: { 
      pt: 'Massagem Ayurvédica', 
      en: 'Ayurvedic Massage', 
      es: 'Masaje Ayurvédico', 
      zh: '阿育吠陀按摩' 
    },
    category: 'body',
    description: {
      pt: 'Massagem terapêutica baseada nos princípios ayurvédicos que equilibra os Doshas (Vata, Pitta, Kapha) através de técnicas específicas e óleos personalizados. A sessão aquece o corpo, melhora a circulação, nutre a pele e alivia o stress. É profundamente relaxante e revitalizante.',
      en: 'Therapeutic massage based on Ayurvedic principles balancing Doshas through specific techniques and personalized oils. Session warms body, improves circulation, nourishes skin and relieves stress. Deeply relaxing and revitalizing.',
      es: 'Masaje terapéutico basado en principios ayurvédicos que equilibra los Doshas (Vata, Pitta, Kapha) a través de técnicas específicas y aceites personalizados. La sesión calienta el cuerpo, mejora la circulación, nutre la piel y alivia el estrés.',
      zh: '基于阿育吠陀原理的治疗按摩，通过特定技术和个性化油平衡能量。会话温暖身体，改善循环，滋养皮肤。'
    },
    indications: {
      pt: ['Desequilíbrio de Doshas', 'Stress e fadiga', 'Pele seca e ressecada', 'Rigidez articular', 'Problemas circulatórios', 'Tonificação de tecidos', 'Rejuvenescimento'],
      en: ['Dosha imbalance', 'Stress and fatigue', 'Dry skin', 'Joint stiffness', 'Circulatory problems', 'Tissue tonification', 'Rejuvenation'],
      es: ['Desequilibrio de Doshas', 'Estrés y fatiga', 'Piel seca y resecada', 'Rigidez articular', 'Problemas circulatorios', 'Tonificación de tejidos', 'Rejuvenecimiento'],
      zh: ['能量失衡', '压力和疲劳', '干燥皮肤', '关节僵硬', '循环问题', '组织紧实', '恢复活力']
    },
    indicationTags: ['massagem', 'óleo', 'dosha', 'calor', 'nutrição'],
    contraindications: {
      pt: ['Febre aguda', 'Infecções de pele contagiosas', 'Feridas abertas', 'Trombose', 'Alergia aos óleos utilizados'],
      en: ['Acute fever', 'Contagious skin infections', 'Open wounds', 'Thrombosis', 'Allergy to oils used'],
      es: ['Fiebre aguda', 'Infecciones de piel contagiosas', 'Heridas abiertas', 'Trombosis', 'Alergia a los aceites utilizados'],
      zh: ['急性发烧', '传染性皮肤感染', '开放性伤口', '血栓', '油类过敏']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1509241790015-5a0af9739d21?w=600&h=400&fit=crop'
  },
  {
    id: 'massagem-relaxante',
    name: { 
      pt: 'Massagem Relaxante', 
      en: 'Relaxation Massage', 
      es: 'Masaje Relajante', 
      zh: '放松按摩' 
    },
    category: 'body',
    description: {
      pt: 'Massagem terapêutica suave focada em relaxamento profundo e alívio de tensão muscular. Utiliza movimentos deslizantes, amassamentos e pressão leve sobre toda a musculatura. Reduz drasticamente os níveis de cortisol, melhora a circulação e promove bem-estar geral. Ideal para stress ocupacional e recuperação.',
      en: 'Gentle therapeutic massage focused on deep relaxation and muscle tension relief. Uses sliding movements, kneading and gentle pressure. Drastically reduces cortisol levels, improves circulation and promotes overall wellbeing. Ideal for work stress and recovery.',
      es: 'Masaje terapéutico suave enfocado en relajación profunda y alivio de tensión muscular. Utiliza movimientos deslizantes, amasamientos y presión leve. Reduce drásticamente los niveles de cortisol, mejora la circulación y promueve el bienestar general. Ideal para estrés ocupacional.',
      zh: '温和的治疗按摩，专注于深度放松和肌肉紧张缓解。使用滑动、揉捏和轻压。大幅降低皮质醇水平。'
    },
    indications: {
      pt: ['Stress ocupacional', 'Insônia relacionada a stress', 'Tensão muscular generalizada', 'Ansiedade', 'Desgaste emocional', 'Recuperação geral', 'Bem-estar promocional'],
      en: ['Work stress', 'Stress-related insomnia', 'Generalized muscle tension', 'Anxiety', 'Emotional burnout', 'General recovery', 'Promotional wellbeing'],
      es: ['Estrés ocupacional', 'Insomnio relacionado al estrés', 'Tensión muscular generalizada', 'Ansiedad', 'Desgaste emocional', 'Recuperación general', 'Bienestar promocional'],
      zh: ['工作压力', '压力相关失眠', '全身肌肉紧张', '焦虑', '情绪疲惫', '综合恢复', '健康促进']
    },
    indicationTags: ['massagem', 'relaxamento', 'stress', 'bem-estar', 'tensão'],
    contraindications: {
      pt: ['Febre', 'Infecções agudas', 'Queimaduras', 'Trombose', 'Inflamação muito aguda', 'Câncer em tratamento (requer liberação médica)'],
      en: ['Fever', 'Acute infections', 'Burns', 'Thrombosis', 'Very acute inflammation', 'Cancer in treatment (requires medical clearance)'],
      es: ['Fiebre', 'Infecciones agudas', 'Quemaduras', 'Trombosis', 'Inflamación muy aguda', 'Cáncer en tratamiento (requiere autorización médica)'],
      zh: ['发烧', '急性感染', '烧伤', '血栓', '急性炎症', '癌症治疗']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&h=400&fit=crop'
  },
  {
    id: 'pilates',
    name: { 
      pt: 'Pilates', 
      en: 'Pilates', 
      es: 'Pilates', 
      zh: '普拉提' 
    },
    category: 'body',
    description: {
      pt: 'Sistema de exercício que fortalece o core (centro do corpo) através de movimentos controlados e respiração consciente. Melhora postura, equilíbrio, flexibilidade e força muscular profunda. Pode ser praticado em estúdio, em casa ou com aparelhos específicos. Acessível a todas as idades e níveis de condicionamento.',
      en: 'Exercise system strengthening core through controlled movements and conscious breathing. Improves posture, balance, flexibility and deep muscle strength. Can be practiced at studio, home or with specific equipment. Accessible to all ages and fitness levels.',
      es: 'Sistema de ejercicio que fortalece el core (centro del cuerpo) a través de movimientos controlados y respiración consciente. Mejora postura, equilibrio, flexibilidad y fuerza muscular profunda. Puede practicarse en estudio, en casa o con aparatos específicos. Accesible a todas las edades.',
      zh: '通过受控运动和有意识呼吸加强核心的运动系统。改善姿势、平衡、灵活性和深层肌肉力量。'
    },
    indications: {
      pt: ['Fortalecimento do core', 'Melhora postural', 'Reabilitação pós-parto', 'Dores de costas', 'Flexibilidade reduzida', 'Equilíbrio deficiente', 'Condicionamento geral'],
      en: ['Core strengthening', 'Postural improvement', 'Post-natal rehabilitation', 'Back pain', 'Reduced flexibility', 'Poor balance', 'General conditioning'],
      es: ['Fortalecimiento del core', 'Mejora postural', 'Rehabilitación posparto', 'Dolores de espalda', 'Flexibilidad reducida', 'Equilibrio deficiente', 'Acondicionamiento general'],
      zh: ['核心强化', '姿势改进', '产后康复', '背痛', '灵活性降低', '平衡不良', '通用训练']
    },
    indicationTags: ['exercício', 'core', 'postura', 'força', 'controle'],
    contraindications: {
      pt: ['Inflamação articular muito aguda', 'Hérnias de disco em fase aguda', 'Osteoporose severa (para certos movimentos)', 'Gravidez sem supervisão de pilates pré-natal', 'Hipertensão descontrolada'],
      en: ['Very acute joint inflammation', 'Acute disc herniation', 'Severe osteoporosis (certain movements)', 'Pregnancy without prenatal pilates supervision', 'Uncontrolled hypertension'],
      es: ['Inflamación articular muy aguda', 'Hernia de disco en fase aguda', 'Osteoporosis severa (para ciertos movimientos)', 'Embarazo sin supervisión de pilates prenatal', 'Hipertensión descontrolada'],
      zh: ['非常急性关节炎症', '急性椎间盘突出', '严重骨质疏松症', '无监督妊娠', '未控制的高血压']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop'
  },
  {
    id: 'rolfing',
    name: { 
      pt: 'Rolfing', 
      en: 'Rolfing', 
      es: 'Rolfing', 
      zh: '罗夫瑜伽' 
    },
    category: 'body',
    description: {
      pt: 'Técnica de manipulação fascial profunda que reorganiza o tecido conjuntivo para melhorar o alinhamento corporal. Usa pressão lenta e deliberada em linhas de tração específicas da fáscia. Melhora postura, movimento, recuperação de lesões e integração corporal. Sensações podem variar de desconfortável a altamente revigorante.',
      en: 'Deep fascial manipulation technique reorganizing connective tissue to improve body alignment. Uses slow deliberate pressure on specific fascial lines of pull. Improves posture, movement, injury recovery and body integration. Sensations vary from uncomfortable to highly invigorating.',
      es: 'Técnica de manipulación fascial profunda que reorganiza el tejido conectivo para mejorar la alineación corporal. Utiliza presión lenta y deliberada en líneas de tracción específicas de la fascia. Mejora postura, movimiento, recuperación de lesiones e integración corporal.',
      zh: '深层筋膜操纵技术，重新组织结缔组织以改善身体对齐。使用缓慢、刻意的压力在特定的筋膜牵拉线上。'
    },
    indications: {
      pt: ['Postura deficiente', 'Limitações de movimento estruturais', 'Cicatrizes fibrosas', 'Lesões crônicas', 'Integração corporal pós-trauma', 'Melhora de coordenação motora', 'Realinhamento de estrutura corporal'],
      en: ['Poor posture', 'Structural movement limitations', 'Fibrous scars', 'Chronic injuries', 'Post-trauma body integration', 'Motor coordination improvement', 'Body structure realignment'],
      es: ['Postura deficiente', 'Limitaciones de movimiento estructurales', 'Cicatrices fibrosas', 'Lesiones crónicas', 'Integración corporal post-trauma', 'Mejora de coordinación motora', 'Realineación de estructura corporal'],
      zh: ['不良姿势', '结构性运动限制', '纤维疤痕', '慢性损伤', '创伤后整合', '运动协调改进', '身体结构重新对齐']
    },
    indicationTags: ['fáscia', 'estrutura', 'postura', 'integração', 'profundo'],
    contraindications: {
      pt: ['Inflamação muito aguda', 'Feridas abertas ou cicatrização inadequada', 'Osteoporose severa', 'Transtornos coagulativos', 'Sensibilidade ao toque muito elevada (pode ser explorado com técnicas suaves)'],
      en: ['Very acute inflammation', 'Open wounds or inadequate scarring', 'Severe osteoporosis', 'Coagulation disorders', 'Very high touch sensitivity (can be explored with gentle techniques)'],
      es: ['Inflamación muy aguda', 'Heridas abiertas o cicatrización inadecuada', 'Osteoporosis severa', 'Trastornos coagulativos', 'Sensibilidad al toque muy elevada (puede explorarse con técnicas suaves)'],
      zh: ['非常急性炎症', '开放性伤口或不适当愈合', '严重骨质疏松症', '凝血障碍', '极高触觉敏感性']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1549576228-d1c7ef1b3a8e?w=600&h=400&fit=crop'
  },
  {
    id: 'tai-chi-chuan',
    name: { 
      pt: 'Tai Chi Chuan', 
      en: 'Tai Chi Chuan', 
      es: 'Tai Chi Chuan', 
      zh: '太极拳' 
    },
    category: 'body',
    description: {
      pt: 'Arte marcial interna chinesa que combina movimento fluido, respiração e meditação. Praticada lentamente com sequências específicas (formas). Cultiva equilíbrio, flexibilidade, força interior (Chi) e harmonia mente-corpo. É preventiva e curativa, adequada para todas as idades.',
      en: 'Chinese internal martial art combining fluid movement, breathing and meditation. Practiced slowly with specific sequences (forms). Cultivates balance, flexibility, inner strength (Chi) and mind-body harmony. Preventive and curative, suitable for all ages.',
      es: 'Arte marcial interna china que combina movimiento fluido, respiración y meditación. Se practica lentamente con secuencias específicas (formas). Cultiva equilibrio, flexibilidad, fuerza interior (Chi) y armonía mente-cuerpo. Es preventiva y curativa, adecuada para todas las edades.',
      zh: '结合流畅运动、呼吸和冥想的中国内家拳。缓慢练习特定的序列（形式）。培养平衡、灵活性和内在力量。'
    },
    indications: {
      pt: ['Equilíbrio deficiente (prevenção de quedas em idosos)', 'Stress e ansiedade', 'Hipertensão', 'Artrite e dores articulares', 'Fraqueza geral', 'Busca de espiritualidade', 'Integração mente-corpo'],
      en: ['Poor balance (fall prevention in elderly)', 'Stress and anxiety', 'Hypertension', 'Arthritis and joint pain', 'General weakness', 'Spirituality seeking', 'Mind-body integration'],
      es: ['Equilibrio deficiente (prevención de caídas en adultos mayores)', 'Estrés y ansiedad', 'Hipertensión', 'Artritis y dolor articular', 'Debilidad general', 'Búsqueda de espiritualidad', 'Integración mente-cuerpo'],
      zh: ['平衡不良（预防跌倒）', '压力和焦虑', '高血压', '关节炎', '全身虚弱', '灵性追求', '身心整合']
    },
    indicationTags: ['movimento', 'fluido', 'martial', 'equilibrio', 'chi'],
    contraindications: {
      pt: ['Inflamação articular muito aguda (requer modificações)', 'Fraturas recentes', 'Tontura severa não investigada', 'Problemas de equilíbrio com risco de queda extremo', 'Demência avançada'],
      en: ['Very acute joint inflammation (requires modifications)', 'Recent fractures', 'Severe uninvestigated dizziness', 'Balance problems with extreme fall risk', 'Advanced dementia'],
      es: ['Inflamación articular muy aguda (requiere modificaciones)', 'Fracturas recientes', 'Mareos severos no investigados', 'Problemas de equilibrio con riesgo extremo de caída', 'Demencia avanzada'],
      zh: ['非常急性关节炎症', '近期骨折', '严重眩晕', '极端跌倒风险', '晚期痴呆']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop'
  },
  {
    id: 'terapia-craniossacral',
    name: { 
      pt: 'Terapia Craniossacral', 
      en: 'Craniosacral Therapy', 
      es: 'Terapia Craneosacral', 
      zh: '颅骶椎疗法' 
    },
    category: 'body',
    description: {
      pt: 'Terapia manipulativa suave focada na mobilização do líquido cefalorraquidiano e das estruturas relacionadas. O terapeuta utiliza toques muito leves na cabeça, coluna e sacro para detectar e liberar restrições. Promove profunda relaxação, melhora imunidade e equilibra o sistema nervoso.',
      en: 'Gentle manipulative therapy focused on mobilization of cerebrospinal fluid and related structures. Therapist uses very light touches on head, spine and sacrum to detect and release restrictions. Promotes deep relaxation, improves immunity and balances nervous system.',
      es: 'Terapia manipulativa suave enfocada en la movilización del líquido cefalorraquídeo y estructuras relacionadas. El terapeuta utiliza toques muy leves en la cabeza, columna y sacro para detectar y liberar restricciones. Promueve relajación profunda, mejora inmunidad y equilibra el sistema nervioso.',
      zh: '温和的操纵疗法，专注于脑脊液动员。治疗师使用非常轻的触碰来检测和释放限制。促进深度放松。'
    },
    indications: {
      pt: ['Migranas e enxaquecas', 'Tinnitus e problemas auditivos', 'TMJ e disfunções cranianas', 'Stress e tensão', 'Insônia', 'Sequelas pós-traumáticas', 'Tonificação imunológica'],
      en: ['Migraines', 'Tinnitus and hearing problems', 'TMJ and cranial dysfunctions', 'Stress and tension', 'Insomnia', 'Post-traumatic sequelae', 'Immune tonification'],
      es: ['Migrañas', 'Tinnitus y problemas auditivos', 'ATM y disfunciones craneales', 'Estrés y tensión', 'Insomnio', 'Secuelas postraumáticas', 'Tonificación inmunológica'],
      zh: ['偏头痛', '耳鸣', '颞下颌关节功能障碍', '压力', '失眠', '创伤后遗症', '免疫调理']
    },
    indicationTags: ['crânio', 'suave', 'sistema', 'nervoso', 'relaxamento'],
    contraindications: {
      pt: ['Meningite ativa ou suspeita', 'Pressão intracraniana aumentada não controlada', 'Transtornos psicóticos em crise', 'Recusa em permitir toque na cabeça', 'Fobia extrema de contato'],
      en: ['Active or suspected meningitis', 'Uncontrolled increased intracranial pressure', 'Psychotic disorders in crisis', 'Refusal to allow head touch', 'Extreme contact phobia'],
      es: ['Meningitis activa o sospechada', 'Presión intracraneal aumentada no controlada', 'Trastornos psicóticos en crisis', 'Rechazo a permitir toque en la cabeza', 'Fobia extrema al contacto'],
      zh: ['活跃或疑似脑膜炎', '未控制的颅内压增加', '精神病危机', '拒绝头部接触', '极端接触恐惧']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop'
  },
  {
    id: 'ventosaterapia',
    name: { 
      pt: 'Ventosaterapia', 
      en: 'Cupping Therapy', 
      es: 'Ventosaterapia', 
      zh: '拔罐疗法' 
    },
    category: 'body',
    description: {
      pt: 'Técnica da Medicina Tradicional Chinesa que utiliza copos de vidro, plástico ou bambú para criar sucção na pele. A sucção move o Qi e sangue, aliviando dor e inflamação. Deixa marcas temporárias (roxos). Excelente para dores musculares, problemas respiratórios e desobstrução de meridiano.',
      en: 'Traditional Chinese Medicine technique using glass, plastic or bamboo cups to create skin suction. Suction moves Qi and blood, relieving pain and inflammation. Leaves temporary marks (bruises). Excellent for muscle pain, respiratory issues and meridian clearance.',
      es: 'Técnica de la Medicina Tradicional China que utiliza copas de vidrio, plástico o bambú para crear succión en la piel. La succión mueve el Qi y la sangre, aliviando el dolor y la inflamación. Deja marcas temporales (moretones). Excelente para dolores musculares y problemas respiratorios.',
      zh: '利用玻璃、塑料或竹杯在皮肤上产生吸力的中医技术。吸力移动气血，缓解疼痛和炎症。留下临时标记。'
    },
    indications: {
      pt: ['Dores musculares e nas costas', 'Problemas respiratórios (asma, bronquite)', 'Obstrução de meridiano', 'Celulite', 'Problemas de circulação', 'Inchaço', 'Liberação de tensão miofascial'],
      en: ['Muscle and back pain', 'Respiratory problems (asthma, bronchitis)', 'Meridian obstruction', 'Cellulite', 'Circulation problems', 'Swelling', 'Myofascial tension release'],
      es: ['Dolores musculares y de espalda', 'Problemas respiratorios (asma, bronquitis)', 'Obstrucción de meridiano', 'Celulitis', 'Problemas de circulación', 'Inflamación', 'Liberación de tensión miofascial'],
      zh: ['肌肉和背痛', '呼吸问题', '经络阻滞', '橘皮组织', '循环问题', '肿胀', '肌筋膜释放']
    },
    indicationTags: ['ventosa', 'sucção', 'dor', 'circulação', 'chinesa'],
    contraindications: {
      pt: ['Pele muito sensível ou com condições (psoriase, eczema)', 'Feridas abertas', 'Varizes (requer cuidado)', 'Queimaduras', 'Trombose', 'Uso de anticoagulantes (relativo)', 'Gravidez (evitar abdômen)'],
      en: ['Very sensitive skin or conditions (psoriasis, eczema)', 'Open wounds', 'Varicose veins (requires care)', 'Burns', 'Thrombosis', 'Anticoagulant use (relative)', 'Pregnancy (avoid abdomen)'],
      es: ['Piel muy sensible o con condiciones (psoriasis, eccema)', 'Heridas abiertas', 'Varices (requiere cuidado)', 'Quemaduras', 'Trombosis', 'Uso de anticoagulantes (relativo)', 'Embarazo (evitar abdomen)'],
      zh: ['非常敏感的皮肤', '开放性伤口', '静脉曲张', '烧伤', '血栓', '血液稀释剂使用', '怀孕（避免腹部）']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop'
  },
  {
    id: 'yoga',
    name: { 
      pt: 'Yoga', 
      en: 'Yoga', 
      es: 'Yoga', 
      zh: '瑜伽' 
    },
    category: 'body',
    description: {
      pt: 'Filosofia e prática oriental que une movimento, respiração, meditação e ética para alcançar equilíbrio e auto-realização. Existem muitos estilos (Hatha, Vinyasa, Kundalini, etc). Melhora flexibilidade, força, respiração, concentração e bem-estar integral. Acessível a qualquer idade.',
      en: 'Eastern philosophy and practice uniting movement, breathing, meditation and ethics to achieve balance and self-realization. Many styles (Hatha, Vinyasa, Kundalini, etc). Improves flexibility, strength, breathing, concentration and integral wellbeing. Accessible to any age.',
      es: 'Filosofía y práctica oriental que une movimiento, respiración, meditación y ética para lograr equilibrio y auto-realización. Hay muchos estilos (Hatha, Vinyasa, Kundalini, etc). Mejora flexibilidad, fuerza, respiración, concentración y bienestar integral. Accesible a cualquier edad.',
      zh: '结合运动、呼吸、冥想和伦理的东方哲学和实践。许多风格。改善灵活性、力量、呼吸、专注和整体幸福感。'
    },
    indications: {
      pt: ['Stress e ansiedade', 'Flexibilidade reduzida', 'Fraqueza muscular', 'Insônia', 'Postura deficiente', 'Busca espiritual', 'Integração mente-corpo-espírito'],
      en: ['Stress and anxiety', 'Reduced flexibility', 'Muscle weakness', 'Insomnia', 'Poor posture', 'Spiritual seeking', 'Mind-body-spirit integration'],
      es: ['Estrés y ansiedad', 'Flexibilidad reducida', 'Debilidad muscular', 'Insomnio', 'Postura deficiente', 'Búsqueda espiritual', 'Integración mente-cuerpo-espíritu'],
      zh: ['压力和焦虑', '灵活性降低', '肌肉虚弱', '失眠', '不良姿势', '灵性追求', '身心灵整合']
    },
    indicationTags: ['movimento', 'respiração', 'meditação', 'flexibilidade', 'bem-estar'],
    contraindications: {
      pt: ['Inflamação articular muito aguda', 'Hérnias de disco em fase aguda (certos asanas são contra-indicados)', 'Osteoporose severa (evitar inversões)', 'Gravidez sem instrutor qualificado em yoga pré-natal', 'Pressão arterial descontrolada em yoga invertida'],
      en: ['Very acute joint inflammation', 'Acute disc herniation (certain asanas contraindicated)', 'Severe osteoporosis (avoid inversions)', 'Pregnancy without qualified prenatal yoga instructor', 'Uncontrolled blood pressure in inverted yoga'],
      es: ['Inflamación articular muy aguda', 'Hernia de disco en fase aguda (ciertos asanas contraindic ados)', 'Osteoporosis severa (evitar inversiones)', 'Embarazo sin instructor calificado en yoga prenatal', 'Presión arterial descontrolada en yoga invertida'],
      zh: ['非常急性关节炎症', '急性椎间盘突出', '严重骨质疏松症', '无资格的妊娠瑜伽', '高血压倒立瑜伽']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop'
  },
  {
    id: 'apometria',
    name: { 
      pt: 'Apometria', 
      en: 'Apometry', 
      es: 'Apometría', 
      zh: '阿波仪疗法' 
    },
    category: 'mind',
    description: {
      pt: 'Técnica mediúnica que trabalha a libertação de espíritos desencarnados. Acredita que doenças podem ser causadas por obsessão espiritual ou traumatização de almas. A sessão visa deslocar essas entidades para planos apropriados e resgatar partes da essência do cliente. Requer abertura a crenças espirituais.',
      en: 'Mediumistic technique working on liberation of disembodied spirits. Believes illness can be caused by spiritual obsession or soul trauma. Session aims to displace entities to appropriate planes and rescue parts of client\'s essence. Requires openness to spiritual beliefs.',
      es: 'Técnica mediúmnica que trabaja en la liberación de espíritus desencarnados. Cree que las enfermedades pueden ser causadas por obsesión espiritual. La sesión busca desplazar esas entidades a planos apropiados y rescatar partes de la esencia del cliente. Requiere apertura a creencias espirituales.',
      zh: '在脱体灵魂解放上工作的通灵技术。相信疾病可能由精神迷恋或灵魂创伤引起。会议旨在将实体转移到适当的平面。'
    },
    indications: {
      pt: ['Possível obsessão espiritual', 'Trauma de vidas passadas (segundo a crença)', 'Bloqueios energéticos de origem espiritual', 'Fragmentação de alma', 'Depressão inexplicada', 'Fobias sem origem aparente', 'Busca de cura profunda espiritual'],
      en: ['Possible spiritual obsession', 'Past life trauma (according to belief)', 'Spiritual origin energy blocks', 'Soul fragmentation', 'Unexplained depression', 'Phobias with no apparent origin', 'Search for deep spiritual healing'],
      es: ['Posible obsesión espiritual', 'Trauma de vidas pasadas (según la creencia)', 'Bloques energéticos de origen espiritual', 'Fragmentación de alma', 'Depresión inexplicada', 'Fobias sin origen aparente', 'Búsqueda de curación espiritual profunda'],
      zh: ['可能的精神迷恋', '前世创伤', '精神源能量阻滞', '灵魂碎片化', '无法解释的抑郁', '原因不明的恐惧症', '灵性深层治愈']
    },
    indicationTags: ['espiritual', 'desencarnado', 'alma', 'libertação', 'mediúnica'],
    contraindications: {
      pt: ['Psicose ativa (pode intensificar delírios)', 'Descrença total em espiritualidade (bloqueia resultado)', 'Transtorno de personalidade com manipulação extrema', 'Depressão severa com ideação suicida (requer monitoramento)', 'Fé religiosa rigidamente exclusivista'],
      en: ['Active psychosis (may intensify delusions)', 'Total disbelief in spirituality (blocks result)', 'Personality disorder with extreme manipulation', 'Severe depression with suicidal ideation (requires monitoring)', 'Rigidly exclusive religious faith'],
      es: ['Psicosis activa (puede intensificar delirios)', 'Incredulidad total en espiritualidad (bloquea resultado)', 'Trastorno de personalidad con manipulación extrema', 'Depresión severa con ideación suicida (requiere monitoreo)', 'Fe religiosa rígidamente exclusivista'],
      zh: ['活跃精神病', '对灵性完全怀疑', '极端操纵人格障碍', '严重抑郁与自杀观念', '宗教绝对主义']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop'
  },
  {
    id: 'cromoterapia',
    name: { 
      pt: 'Cromoterapia', 
      en: 'Color Therapy', 
      es: 'Cromoterapia', 
      zh: '色光疗法' 
    },
    category: 'energy',
    description: {
      pt: 'Terapia baseada no uso de cores para afetar o humor, energia e saúde. Cada cor tem frequência vibratória específica que influencia chakras e estados emocionais. Pode utilizar luz colorida, cristais coloridos ou visualização de cores. É sutil, não invasiva e complementar.',
      en: 'Therapy based on using colors to affect mood, energy and health. Each color has specific vibrational frequency influencing chakras and emotional states. Can use colored light, colored crystals or color visualization. Subtle, non-invasive and complementary.',
      es: 'Terapia basada en el uso de colores para afectar el estado de ánimo, la energía y la salud. Cada color tiene una frecuencia vibratoria específica que influye en los chakras y estados emocionales. Puede utilizar luz colorida, cristales de colores o visualización de colores. Es sutil, no invasiva y complementaria.',
      zh: '基于使用颜色影响情绪、能量和健康的疗法。每种颜色都有特定的频率。可以使用彩色光、彩色晶体或颜色可视化。'
    },
    indications: {
      pt: ['Desequilíbrio emocional', 'Fatiga e apatia', 'Problemas de concentração', 'Dores crônicas', 'Bloqueios energéticos', 'Busca de harmonia', 'Complemento a outras terapias'],
      en: ['Emotional imbalance', 'Fatigue and apathy', 'Concentration problems', 'Chronic pain', 'Energy blocks', 'Harmony seeking', 'Complement to other therapies'],
      es: ['Desequilibrio emocional', 'Fatiga y apatia', 'Problemas de concentración', 'Dolor crónico', 'Bloques energéticos', 'Búsqueda de armonía', 'Complemento a otras terapias'],
      zh: ['情绪失衡', '疲劳和冷漠', '专注困难', '慢性疼痛', '能量阻滞', '寻求和谐', '其他疗法补充']
    },
    indicationTags: ['cor', 'frequência', 'luz', 'energia', 'chakra'],
    contraindications: {
      pt: ['Epilepsia com sensibilidade a luz piscante', 'Cegueira total (pode usar concentração mental)', 'Psicose visual (pode ser problemático)', 'Deficiência visual grave', 'Rejeição à simbologia de cores'],
      en: ['Epilepsy with light sensitivity', 'Total blindness (can use mental concentration)', 'Visual psychosis (may be problematic)', 'Severe vision impairment', 'Rejection of color symbolism'],
      es: ['Epilepsia con sensibilidad a la luz parpadeante', 'Ceguera total (puede usar concentración mental)', 'Psicosis visual (puede ser problemático)', 'Deficiencia visual grave', 'Rechazo a la simbología de colores'],
      zh: ['闪烁光敏癫痫', '完全失明', '视觉精神病', '严重视力障碍', '拒绝色彩象征']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&h=400&fit=crop'
  },
  {
    id: 'cristaloterapia',
    name: { 
      pt: 'Cristaloterapia', 
      en: 'Crystal Therapy', 
      es: 'Cristaloterapia', 
      zh: '水晶疗法' 
    },
    category: 'energy',
    description: {
      pt: 'Terapia que utiliza cristais e pedras para equilibrar e harmonizar a energia do corpo. Cada cristal tem propriedades energéticas únicas que influenciam chakras, emoções e saúde. Podem ser colocados no corpo, levados na bolsa ou meditados. Muito sutil e complementar.',
      en: 'Therapy using crystals and stones to balance and harmonize body energy. Each crystal has unique energetic properties influencing chakras, emotions and health. Can be placed on body, carried or meditated with. Very subtle and complementary.',
      es: 'Terapia que utiliza cristales y piedras para equilibrar y armonizar la energía del cuerpo. Cada cristal tiene propiedades energéticas únicas que influyen en los chakras, emociones y salud. Pueden colocarse en el cuerpo, llevarse o meditarse. Muy sutil y complementaria.',
      zh: '利用晶体和石头平衡和协调身体能量的疗法。每种晶体都有独特的能量特性。可以放在身体上、携带或冥想。'
    },
    indications: {
      pt: ['Desequilíbrio energético', 'Bloqueios emocionais', 'Problemas de relacionamento', 'Insegurança e medo', 'Baixa criatividade', 'Busca de proteção energética', 'Complemento meditativo'],
      en: ['Energy imbalance', 'Emotional blocks', 'Relationship problems', 'Insecurity and fear', 'Low creativity', 'Seeking energy protection', 'Meditative complement'],
      es: ['Desequilibrio energético', 'Bloqueos emocionales', 'Problemas de relación', 'Inseguridad y miedo', 'Baja creatividad', 'Búsqueda de protección energética', 'Complemento meditativo'],
      zh: ['能量失衡', '情绪阻滞', '关系问题', '不安全感和恐惧', '低创意', '寻求能量保护', '冥想补充']
    },
    indicationTags: ['cristal', 'pedra', 'energia', 'chakra', 'harmonia'],
    contraindications: {
      pt: ['Nenhuma contraindicação absoluta - é muito sutil', 'Descrença extrema (pode bloquear resultado placebo)', 'Transtorno obsessivo-compulsivo (colecionar cristais pode ser problemático)', 'Superstição patológica'],
      en: ['No absolute contraindications - very subtle', 'Extreme disbelief (may block placebo result)', 'OCD (crystal collecting may be problematic)', 'Pathological superstition'],
      es: ['Ninguna contraindicación absoluta - muy sutil', 'Incredulidad extrema (puede bloquear resultado placebo)', 'TOC (coleccionar cristales puede ser problemático)', 'Superstición patológica'],
      zh: ['没有绝对禁忌', '极端怀疑', '强迫症', '病态迷信']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop'
  },
  {
    id: 'cura-pranica',
    name: { 
      pt: 'Cura Prânica', 
      en: 'Pranic Healing', 
      es: 'Cura Pránica', 
      zh: '能量针灸疗法' 
    },
    category: 'energy',
    description: {
      pt: 'Sistema de cura baseado na manipulação da energia vital (Prana) ao redor do corpo. O terapeuta não toca - trabalha no campo energético etereo fazendo varreduras, limpeza e energização. Busca restaurar o equilíbrio energético para permitir autocura do corpo. Muito prático e científico na abordagem.',
      en: 'Healing system based on manipulation of vital energy (Prana) around body. Therapist doesn\'t touch - works in etheric energy field scanning, cleaning and energizing. Seeks to restore energy balance allowing body self-healing. Very practical and scientific in approach.',
      es: 'Sistema de curación basado en la manipulación de la energía vital (Prana) alrededor del cuerpo. El terapeuta no toca - trabaja en el campo energético etéreo haciendo exploración, limpieza y energización. Busca restaurar el equilibrio energético para permitir autocura del cuerpo.',
      zh: '基于操纵身体周围生命能量（Prana）的治疗系统。治疗师不接触 - 在以太能量场中扫描、清洁和充能。'
    },
    indications: {
      pt: ['Desintoxicação energética', 'Bloqueios de energia', 'Aura comprometida', 'Desvitalização', 'Complemento a tratamentos médicos', 'Recuperação de cirurgias', 'Imunidade debilitada'],
      en: ['Energy detoxification', 'Energy blocks', 'Compromised aura', 'Devitalization', 'Complement to medical treatments', 'Surgery recovery', 'Weakened immunity'],
      es: ['Desintoxicación energética', 'Bloques de energía', 'Aura comprometida', 'Desv italización', 'Complemento a tratamientos médicos', 'Recuperación de cirugías', 'Inmunidad debilitada'],
      zh: ['能量排毒', '能量阻滞', '受损光环', '活力丧失', '医疗补充', '手术恢复', '免疫虚弱']
    },
    indicationTags: ['prana', 'energia', 'aura', 'campo', 'limpeza'],
    contraindications: {
      pt: ['Psicose (pode intensificar alucinações sobre campos)', 'Descrença extrema (bloqueia efeito)', 'Dependência exclusiva (evitando tratamento médico necessário)', 'Transtorno de despersonalização severo'],
      en: ['Psychosis (may intensify hallucinations about fields)', 'Extreme disbelief (blocks effect)', 'Exclusive dependency (avoiding needed medical treatment)', 'Severe depersonalization disorder'],
      es: ['Psicosis (puede intensificar alucinaciones sobre campos)', 'Incredulidad extrema (bloquea efecto)', 'Dependencia exclusiva (evitando tratamiento médico necesario)', 'Trastorno de despersonalización severo'],
      zh: ['精神病', '极端怀疑', '排他性依赖', '严重去人格化']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1517511620798-cdc3fbaa9900?w=600&h=400&fit=crop'
  },
  {
    id: 'eft',
    name: { 
      pt: 'EFT (Emotional Freedom Technique)', 
      en: 'EFT (Emotional Freedom Technique)', 
      es: 'EFT (Técnica de Libertad Emocional)', 
      zh: 'EFT（情感自由技巧）' 
    },
    category: 'mind',
    description: {
      pt: 'Técnica que combina tapping (batidas rítmicas) em pontos de acupuntura com afirmações psicológicas. Utiliza componentes da PNL, hipnose e acupuntura. Visa desobstruir bloqueios emocionais rapidamente. Também chamada de "acupuntura emocional". Muito eficaz para fobias, traumas e ansiedade.',
      en: 'Technique combining tapping on acupuncture points with psychological affirmations. Uses components of NLP, hypnosis and acupuncture. Aims to quickly clear emotional blocks. Also called "emotional acupuncture". Very effective for phobias, trauma and anxiety.',
      es: 'Técnica que combina tapping (toques rítmicos) en puntos de acupuntura con afirmaciones psicológicas. Utiliza componentes de PNL, hipnosis y acupuntura. Busca desobstruir bloqueios emocionales rápidamente. También llamada "acupuntura emocional". Muy eficaz para fobias, traumas y ansiedad.',
      zh: '结合针灸点点击和心理肯定的技术。使用NLP、催眠和针灸成分。旨在快速清除情绪阻滞。'
    },
    indications: {
      pt: ['Fobias e medos', 'Ansiedade', 'Traumas e TEPT', 'Baixa autoestima', 'Padrões repetitivos', 'Raiva reprimida', 'Bloqueios emocionais'],
      en: ['Phobias and fears', 'Anxiety', 'Trauma and PTSD', 'Low self-esteem', 'Repetitive patterns', 'Repressed anger', 'Emotional blocks'],
      es: ['Fobias y miedos', 'Ansiedad', 'Trauma y TEPT', 'Baja autoestima', 'Patrones repetitivos', 'Rabia reprimida', 'Bloqueos emocionales'],
      zh: ['恐惧症和恐惧', '焦虑', '创伤和创伤后应激障碍', '低自尊', '重复模式', '压抑愤怒', '情绪阻滞']
    },
    indicationTags: ['tapping', 'acupuntura', 'emoção', 'técnica', 'libertação'],
    contraindications: {
      pt: ['Psicose ativa (pode ser confuso)', 'Transtorno dissociativo grave (evitar tapping)', 'Recusa em fazer autotap (dificulta terapia)', 'Desordem neurológica severa afetando coordenação'],
      en: ['Active psychosis (may be confusing)', 'Severe dissociative disorder (avoid tapping)', 'Refusal to do self-tapping (hampers therapy)', 'Severe neurological disorder affecting coordination'],
      es: ['Psicosis activa (puede ser confuso)', 'Trastorno disociativo grave (evitar tapping)', 'Rechazo a autotap (dificulta terapia)', 'Trastorno neurológico severo que afecta coordinación'],
      zh: ['活跃精神病', '严重解离障碍', '拒绝自我敲击', '严重神经障碍']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop'
  },
  {
    id: 'geobiologia',
    name: { 
      pt: 'Geobiologia', 
      en: 'Geobiology', 
      es: 'Geobiología', 
      zh: '地球生物学' 
    },
    category: 'natural',
    description: {
      pt: 'Estudo da relação entre a energia telúrica terrestre e a saúde humana. O geobiólogo mapeia zonas geopatogênicas (nocivas) em residências/trabalho e propõe soluções de neutralização. Acredita-se que as radiações terrestres afetam o sistema imunológico. Complementar a outras terapias.',
      en: 'Study of relationship between telluric earth energy and human health. Geobiologist maps geopathogenic (harmful) zones in homes/workplaces and proposes neutralization solutions. Believed that earth radiations affect immune system. Complementary to other therapies.',
      es: 'Estudio de la relación entre la energía telúrica terrestre y la salud humana. El geobiólogo mapea zonas geopatógenas (nocivas) en residencias/trabajo y propone soluciones de neutralización. Se cree que las radiaciones terrestres afectan el sistema inmunológico.',
      zh: '研究地球能量与人类健康的关系。地球生物学家绘制有害地带并提出中性化解决方案。'
    },
    indications: {
      pt: ['Sensibilidade ambiental', 'Problemas de saúde recorrentes em local específico', 'Insônia persistente em certas localizações', 'Compatibilização de ambiente', 'Proteção energética ambiental', 'Análise de qualidade de vida no lar'],
      en: ['Environmental sensitivity', 'Recurring health problems in specific location', 'Persistent insomnia in certain places', 'Environment compatibility', 'Environmental energy protection', 'Home quality of life analysis'],
      es: ['Sensibilidad ambiental', 'Problemas de salud recurrentes en ubicación específica', 'Insomnio persistente en ciertos lugares', 'Compatibilización de ambiente', 'Protección energética ambiental', 'Análisis de calidad de vida en el hogar'],
      zh: ['环境敏感性', '特定位置反复健康问题', '特定地点持久性失眠', '环境兼容性', '环保能量保护', '家庭生活质量分析']
    },
    indicationTags: ['ambiente', 'energia', 'telúrica', 'proteção', 'local'],
    contraindications: {
      pt: ['Extrema superstição que prejudica tomada de decisão', 'Psicose com delírio de perseguição (pode piorar)', 'Obsessão por limpeza energética', 'Fobias ambientais severas'],
      en: ['Extreme superstition harming decision-making', 'Psychosis with persecution delusion (may worsen)', 'Obsession with energy cleansing', 'Severe environmental phobias'],
      es: ['Superstición extrema que perjudica la toma de decisiones', 'Psicosis con delirio de persecución (puede empeorar)', 'Obsesión por la limpieza energética', 'Fobias ambientales severas'],
      zh: ['极端迷信', '妄想狂精神病', '清洁强迫症', '严重环境恐惧症']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=600&h=400&fit=crop'
  },
  {
    id: 'mesa-radionica',
    name: { 
      pt: 'Mesa Radiônica', 
      en: 'Radionics Table', 
      es: 'Mesa Radiônica', 
      zh: '放射线仪表' 
    },
    category: 'energy',
    description: {
      pt: 'Aparato que utilizafrequências de rádio e radiestesia para diagnosticar e tratar desequilíbrios energéticos remotamente. O terapeuta pode trabalhar com foto ou amostra da pessoa. Busca restabelecer padrões vibratórios saudáveis. Muito controverso, mas tem seguidores. Requer crença no mecanismo.',
      en: 'Device using radio frequencies and radiesthesia to diagnose and treat energy imbalances remotely. Therapist can work with photo or sample of person. Seeks to restore healthy vibrational patterns. Very controversial, but has followers. Requires belief in mechanism.',
      es: 'Aparato que utiliza frecuencias de radio y radiestesia para diagnosticar y tratar desequilibrios energéticos remotamente. El terapeuta puede trabajar con foto o muestra de la persona. Busca restablecer patrones vibracionales saludables. Muy controvertido, pero tiene seguidores.',
      zh: '使用无线电频率和放射能诊断和远程治疗能量失衡的装置。治疗师可以用照片或样本工作。'
    },
    indications: {
      pt: ['Desequilíbrio energético', 'Busca de diagnóstico vibracional', 'Problemas de saúde crônicos refratários', 'Análise de compatibilidade de substâncias', 'Complemento a terapias'],
      en: ['Energy imbalance', 'Seeking vibrational diagnosis', 'Chronic refractory health problems', 'Substance compatibility analysis', 'Therapy complement'],
      es: ['Desequilibrio energético', 'Búsqueda de diagnóstico vibracional', 'Problemas de salud crónicos refractarios', 'Análisis de compatibilidad de sustancias', 'Complemento de terapias'],
      zh: ['能量失衡', '寻求振动诊断', '慢性难治性健康问题', '物质兼容性分析', '疗法补充']
    },
    indicationTags: ['radiônica', 'frequência', 'energia', 'remoto', 'diagnóstico'],
    contraindications: {
      pt: ['Descrença extrema (bloqueia resultado)', 'Psicose com ideias de controle remoto (pode piorar)', 'Dependência exclusiva (substituindo tratamento médico)', 'Transtorno obsessivo-compulsivo com foco em "limpeza" energética'],
      en: ['Extreme disbelief (blocks result)', 'Psychosis with remote control ideas (may worsen)', 'Exclusive dependency (replacing medical treatment)', 'OCD with focus on energy "cleansing"'],
      es: ['Incredulidad extrema (bloquea resultado)', 'Psicosis con ideas de control remoto (puede empeorar)', 'Dependencia exclusiva (sustituyendo tratamiento médico)', 'TOC con enfoque en "limpieza" energética'],
      zh: ['极端怀疑', '遥控控制思想精神病', '排他性依赖', '强迫症清洁强迫']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1578149577879-7f8f23f87db1?w=600&h=400&fit=crop'
  },
  {
    id: 'radiestesia',
    name: { 
      pt: 'Radiestesia', 
      en: 'Radiesthesia', 
      es: 'Radiestesia', 
      zh: '放射能感测' 
    },
    category: 'energy',
    description: {
      pt: 'Prática de detectar radiações e energias usando pêndulos ou varetas. O radiestesista interpreta movimentos do pêndulo para diagnosticar desequilíbrios, encontrar objetos perdidos ou avaliar compatibilidade. É baseada em intuição e sensibilidade energética. Útil como ferramenta diagnóstica complementar.',
      en: 'Practice of detecting radiations and energies using pendulums or dowsing rods. Radiesthetist interprets pendulum movements to diagnose imbalances, find lost objects or assess compatibility. Based on intuition and energy sensitivity. Useful as complementary diagnostic tool.',
      es: 'Práctica de detectar radiaciones y energías utilizando péndulos o varitas de radiestesia. El radiestesista interpreta los movimientos del péndulo para diagnosticar desequilibrios, encontrar objetos perdidos o evaluar compatibilidad. Se basa en intuición y sensibilidad energética.',
      zh: '使用摆锤或测杆检测辐射和能量的实践。放射能感测师解释摆锤运动来诊断失衡、找到失物或评估兼容性。'
    },
    indications: {
      pt: ['Diagnóstico complementar', 'Busca de compatibilidade', 'Localização de objetos perdidos', 'Análise energética', 'Complemento meditativo', 'Desenvolvimento de sensibilidade'],
      en: ['Complementary diagnosis', 'Compatibility seeking', 'Lost object location', 'Energy analysis', 'Meditative complement', 'Sensitivity development'],
      es: ['Diagnóstico complementario', 'Búsqueda de compatibilidad', 'Localización de objetos perdidos', 'Análisis energético', 'Complemento meditativo', 'Desarrollo de sensibilidad'],
      zh: ['互补诊断', '兼容性寻求', '失物寻找', '能量分析', '冥想补充', '敏感性发展']
    },
    indicationTags: ['pêndulo', 'radiação', 'intuição', 'energia', 'diagnóstico'],
    contraindications: {
      pt: ['Descrença extrema', 'Psicose com ideias de influência externa (pode intensificar)', 'Dependência exclusiva para diagnóstico médico', 'Tremor severo (torna difícil usar pêndulo)'],
      en: ['Extreme disbelief', 'Psychosis with ideas of external influence (may intensify)', 'Exclusive medical diagnosis dependency', 'Severe tremor (makes pendulum use difficult)'],
      es: ['Incredulidad extrema', 'Psicosis con ideas de influencia externa (puede intensificar)', 'Dependencia exclusiva para diagnóstico médico', 'Temblor severo (dificulta el uso del péndulo)'],
      zh: ['极端怀疑', '外部影响思想精神病', '医学诊断排他性依赖', '严重震颤']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70570ec0?w=600&h=400&fit=crop'
  },
  {
    id: 'astrologia',
    name: { 
      pt: 'Astrologia', 
      en: 'Astrology', 
      es: 'Astrología', 
      zh: '占星术' 
    },
    category: 'mind',
    description: {
      pt: 'Estudo dos padrões planetários e sua influência na psicologia e destino humano. Um astrólogo interpreta o mapa natal para entender tendências comportamentais, lições de vida e ciclos. Pode ser explorada como ferramenta de autoconhecimento. Não é ciência, mas ferramenta psicológica arquetípica.',
      en: 'Study of planetary patterns and their influence on human psychology and destiny. Astrologer interprets natal chart to understand behavioral tendencies, life lessons and cycles. Can be explored as self-knowledge tool. Not science, but archetypal psychological tool.',
      es: 'Estudio de los patrones planetarios y su influencia en la psicología y destino humano. Un astrólogo interpreta la carta natal para entender tendencias conductuales, lecciones de vida y ciclos. Puede explorarse como herramienta de autoconocimiento. No es ciencia, sino herramienta psicológica arquetípica.',
      zh: '研究行星模式及其对人类心理和命运的影响。占星师解释本命盘以理解行为倾向和人生课程。不是科学，而是心理工具。'
    },
    indications: {
      pt: ['Autoconhecimento', 'Compreensão de padrões de vida', 'Timing para decisões importantes', 'Exploração de potencial pessoal', 'Integração de tendências psicológicas', 'Sentido de propósito'],
      en: ['Self-knowledge', 'Understanding life patterns', 'Timing for important decisions', 'Exploration of personal potential', 'Integration of psychological tendencies', 'Sense of purpose'],
      es: ['Autoconocimiento', 'Comprensión de patrones de vida', 'Timing para decisiones importantes', 'Exploración del potencial personal', 'Integración de tendencias psicológicas', 'Sentido de propósito'],
      zh: ['自我认识', '生活模式理解', '重要决定时机', '个人潜力探索', '心理倾向整合', '目的感']
    },
    indicationTags: ['planeta', 'psicologia', 'padrão', 'destino', 'archetipo'],
    contraindications: {
      pt: ['Psicose com ideias de perseguição cósmica (pode intensificar)', 'Entrega exclusiva do livre-arbítrio', 'Transtorno obsessivo-compulsivo com foco em horários astrológicos', 'Depressão severa (astrologia pode reforçar desespero)'],
      en: ['Psychosis with cosmic persecution ideas (may intensify)', 'Exclusive surrender of free will', 'OCD with focus on astrological timing', 'Severe depression (astrology may reinforce despair)'],
      es: ['Psicosis con ideas de persecución cósmica (puede intensificar)', 'Entrega exclusiva del libre albedrío', 'TOC con enfoque en el timing astrológico', 'Depresión severa (astrología puede reforzar desesperación)'],
      zh: ['宇宙迫害思想精神病', '排他性自由意志投降', '占星时机强迫症', '严重抑郁强化']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1444927714806-8a3f6b9655cb?w=600&h=400&fit=crop'
  },
  {
    id: 'coaching',
    name: { 
      pt: 'Coaching', 
      en: 'Coaching', 
      es: 'Coaching', 
      zh: '辅导' 
    },
    category: 'mind',
    description: {
      pt: 'Processo de desenvolvimento pessoal/profissional onde um coach guia o cliente a atingir metas específicas. Utiliza questões poderosas, estratégias e accountability. Diferencia-se de terapia por focar em objetivos futuros, não em patologia. Acelera mudanças e maximiza potencial.',
      en: 'Personal/professional development process where coach guides client to achieve specific goals. Uses powerful questions, strategies and accountability. Differs from therapy by focusing on future objectives, not pathology. Accelerates change and maximizes potential.',
      es: 'Proceso de desarrollo personal/profesional donde un coach guía al cliente a lograr objetivos específicos. Utiliza preguntas poderosas, estrategias y responsabilidad. Se diferencia de la terapia por enfocarse en objetivos futuros, no en patología. Acelera cambios.',
      zh: '教练指导客户达成特定目标的个人/专业发展过程。使用强有力的问题、策略和问责。不同于治疗，专注于未来目标。'
    },
    indications: {
      pt: ['Blocam para atingir metas', 'Transição de carreira', 'Desenvolvimento de liderança', 'Autoconfiança', 'Planejamento estratégico', 'Otimização de potencial', 'Aceleração de resultados'],
      en: ['Goal achievement blocks', 'Career transition', 'Leadership development', 'Self-confidence', 'Strategic planning', 'Potential optimization', 'Results acceleration'],
      es: ['Bloqueos para alcanzar metas', 'Transición de carrera', 'Desarrollo de liderazgo', 'Autoconfianza', 'Planificación estratégica', 'Optimización de potencial', 'Aceleración de resultados'],
      zh: ['目标阻滞', '职业转变', '领导力发展', '自信', '战略规划', '潜力优化', '结果加速']
    },
    indicationTags: ['objetivo', 'meta', 'desenvolvimento', 'potencial', 'resultados'],
    contraindications: {
      pt: ['Depressão severa (requer terapia primeiro)', 'Transtorno bipolar em crise', 'Psicose ativa', 'Ausência completa de motivação intrínseca', 'Falta de responsabilidade pessoal (coaching requer participação ativa)'],
      en: ['Severe depression (requires therapy first)', 'Bipolar disorder in crisis', 'Active psychosis', 'Complete absence of intrinsic motivation', 'Lack of personal responsibility (coaching requires active participation)'],
      es: ['Depresión severa (requiere terapia primero)', 'Trastorno bipolar en crisis', 'Psicosis activa', 'Ausencia completa de motivación intrínseca', 'Falta de responsabilidad personal (coaching requiere participación activa)'],
      zh: ['严重抑郁', '双相障碍危机', '活跃精神病', '完全缺乏内在动力', '缺乏个人责任']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
  },
  {
    id: 'eneagrama',
    name: { 
      pt: 'Eneagrama', 
      en: 'Enneagram', 
      es: 'Eneagrama', 
      zh: '九点图' 
    },
    category: 'mind',
    description: {
      pt: 'Sistema de tipologia de personalidade que mapeia 9 tipos diferentes de pessoas, seus padrões, motivações e caminhos de crescimento. Utiliza auto-observação e reflexão para compreender-se melhor. Cada tipo tem uma estrutura psicológica específica. Ferramenta poderosa de autoconhecimento.',
      en: 'Personality typology system mapping 9 different people types, their patterns, motivations and growth paths. Uses self-observation and reflection for self-understanding. Each type has specific psychological structure. Powerful self-knowledge tool.',
      es: 'Sistema de tipología de personalidad que mapea 9 tipos diferentes de personas, sus patrones, motivaciones y caminos de crecimiento. Utiliza auto-observación y reflexión para comprenderse mejor. Cada tipo tiene una estructura psicológica específica. Herramienta poderosa de autoconocimiento.',
      zh: '映射9种不同人格类型、其模式、动机和成长路径的人格分类系统。使用自我观察和反思来更好地自我理解。'
    },
    indications: {
      pt: ['Autoconhecimento profundo', 'Compreensão de padrões comportamentais', 'Melhora de relacionamentos', 'Resolução de conflitos', 'Desenvolvimento pessoal', 'Integração de sombra', 'Aceleração de crescimento espiritual'],
      en: ['Deep self-knowledge', 'Understanding behavioral patterns', 'Relationship improvement', 'Conflict resolution', 'Personal development', 'Shadow integration', 'Spiritual growth acceleration'],
      es: ['Autoconocimiento profundo', 'Comprensión de patrones conductuales', 'Mejora de relaciones', 'Resolución de conflictos', 'Desarrollo personal', 'Integración de sombra', 'Aceleración del crecimiento espiritual'],
      zh: ['深层自我认识', '行为模式理解', '关系改进', '冲突解决', '个人发展', '阴影整合', '灵性成长加速']
    },
    indicationTags: ['personalidade', 'tipo', 'padrão', 'crescimento', 'self'],
    contraindications: {
      pt: ['Psicose com ideias fijas sobre si mesmo', 'Transtorno de personalidade com inflexibilidade extrema', 'Negação patológica (recusa em ver padrões)', 'Depressão severa que prejudica autocrítica'],
      en: ['Psychosis with fixed self-ideas', 'Personality disorder with extreme inflexibility', 'Pathological denial (refusing to see patterns)', 'Severe depression impairing self-criticism'],
      es: ['Psicosis con ideas fijas sobre sí mismo', 'Trastorno de personalidad con inflexibilidad extrema', 'Negación patológica (rechazo a ver patrones)', 'Depresión severa que afecta autocrítica'],
      zh: ['固定自我观念精神病', '极度僵硬人格障碍', '病态否认拒绝模式', '严重抑郁自我批评']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
  },
  {
    id: 'mindfulness',
    name: { 
      pt: 'Mindfulness', 
      en: 'Mindfulness', 
      es: 'Mindfulness', 
      zh: '正念' 
    },
    category: 'mind',
    description: {
      pt: 'Prática de atenção plena baseada em meditação budista. Envolve observar pensamentos, emoções e sensações sem julgamento no momento presente. Reduz automaticidade mental, aumenta clareza e compaixão. Pode ser praticada formalmente (meditação) ou informalmente (atividades do dia a dia).',
      en: 'Full attention practice based on Buddhist meditation. Involves observing thoughts, emotions and sensations without judgment in present moment. Reduces mental automaticity, increases clarity and compassion. Can be practiced formally (meditation) or informally (daily activities).',
      es: 'Práctica de atención plena basada en la meditación budista. Implica observar pensamientos, emociones y sensaciones sin juzgar en el momento presente. Reduce la automaticidad mental, aumenta la claridad y compasión. Puede practicarse formalmente (meditación) o informalmente.',
      zh: '基于佛教冥想的完全觉知实践。涉及在当下观察思想、情绪和感觉而不做判断。减少心理自动性，增加清晰度和同情心。'
    },
    indications: {
      pt: ['Ansiedade e distúrbios de ruminação', 'Stress ocupacional', 'Insônia', 'Reatividade emocional', 'Falta de presença', 'Compulsão mental', 'Desenvolvimento de autorregulação'],
      en: ['Anxiety and rumination disorders', 'Work stress', 'Insomnia', 'Emotional reactivity', 'Lack of presence', 'Mental compulsion', 'Self-regulation development'],
      es: ['Ansiedad y trastornos de rumiación', 'Estrés ocupacional', 'Insomnio', 'Reactividad emocional', 'Falta de presencia', 'Compulsión mental', 'Desarrollo de autorregulación'],
      zh: ['焦虑和反芻障碍', '工作压力', '失眠', '情感反应性', '缺乏当下感', '心理强迫', '自我调节发展']
    },
    indicationTags: ['presença', 'atenção', 'meditação', 'consciência', 'momento'],
    contraindications: {
      pt: ['Depressão severa com imobilidade (pode atrapalhar)', 'Psicose (pode intensificar ideação peculiar)', 'Dissociação severa (mindfulness requer integração)', 'Pacientes muito inquietos que pioram com quietude'],
      en: ['Severe depression with immobility (may hinder)', 'Psychosis (may intensify peculiar ideation)', 'Severe dissociation (mindfulness requires integration)', 'Very restless patients who worsen with stillness'],
      es: ['Depresión severa con inmovilidad (puede obstaculizar)', 'Psicosis (puede intensificar ideación peculiar)', 'Disociación severa (mindfulness requiere integración)', 'Pacientes muy inquietos que empeoran con quietud'],
      zh: ['严重抑郁麻痹', '精神病强化观念', '严重解离', '极度不安定患者']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop'
  },
  {
    id: 'numerologia',
    name: { 
      pt: 'Numerologia', 
      en: 'Numerology', 
      es: 'Numerología', 
      zh: '数字学' 
    },
    category: 'mind',
    description: {
      pt: 'Sistema que estuda o significado metafísico dos números e sua influência na vida. Analisa nome, data de nascimento para extrair números pessoais que revelam tendências e lições. Oferece insights sobre propósito, ciclos e energia pessoal. Complementar ao desenvolvimento pessoal.',
      en: 'System studying metaphysical meaning of numbers and their influence on life. Analyzes name, birth date to extract personal numbers revealing tendencies and lessons. Offers insights on purpose, cycles and personal energy. Complementary to personal development.',
      es: 'Sistema que estudia el significado metafísico de los números y su influencia en la vida. Analiza nombre, fecha de nacimiento para extraer números personales que revelan tendencias y lecciones. Ofrece información sobre propósito, ciclos y energía personal.',
      zh: '研究数字形而上学意义及其对生活影响的系统。分析名字和出生日期以提取个人数字。'
    },
    indications: {
      pt: ['Autoconhecimento', 'Compreensão de ciclos de vida', 'Timing de decisões', 'Exploração de propósito', 'Integração de padrões', 'Aceleração de crescimento', 'Exploração de potencial'],
      en: ['Self-knowledge', 'Understanding life cycles', 'Decision timing', 'Purpose exploration', 'Pattern integration', 'Growth acceleration', 'Potential exploration'],
      es: ['Autoconocimiento', 'Comprensión de ciclos de vida', 'Timing de decisiones', 'Exploración de propósito', 'Integración de patrones', 'Aceleración de crecimiento', 'Exploración de potencial'],
      zh: ['自我认识', '生命周期理解', '决定时机', '目的探索', '模式整合', '成长加速', '潜力探索']
    },
    indicationTags: ['número', 'padrão', 'vibração', 'propósito', 'ciclo'],
    contraindications: {
      pt: ['Obsessão por números (TOC)', 'Psicose com numerologia delirante', 'Superstição patológica', 'Fuga da realidade através de números'],
      en: ['Number obsession (OCD)', 'Psychosis with delusional numerology', 'Pathological superstition', 'Reality escape through numbers'],
      es: ['Obsesión por números (TOC)', 'Psicosis con numerología delirante', 'Superstición patológica', 'Escape de la realidad mediante números'],
      zh: ['数字强迫症', '妄想数字学精神病', '病态迷信', '通过数字逃避现实']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70570ec0?w=600&h=400&fit=crop'
  },
  {
    id: 'pnl',
    name: { 
      pt: 'PNL (Programação Neurolinguística)', 
      en: 'NLP (Neuro-Linguistic Programming)', 
      es: 'PNL (Programación Neurolingüística)', 
      zh: 'NLP(神经语言学编程)' 
    },
    category: 'mind',
    description: {
      pt: 'Metodologia que estuda como processamos informações através de linguagem, neurologia e padrões de comportamento. Usa técnicas de ancoragem, reframing e modelagem para reprogramar padrões limitantes. Muito eficaz para mudança rápida de perspectiva e comportamento.',
      en: 'Methodology studying how we process information through language, neurology and behavior patterns. Uses anchoring, reframing and modeling techniques to reprogram limiting patterns. Very effective for quick perspective and behavior change.',
      es: 'Metodología que estudia cómo procesamos información a través del lenguaje, neurología y patrones de comportamiento. Utiliza técnicas de anclaje, reencuadre y modelado para reprogramar patrones limitantes. Muy efectivo para cambio rápido de perspectiva y comportamiento.',
      zh: '研究我们如何通过语言、神经学和行为模式处理信息的方法论。使用锚定、重新框架和建模技术来重新编程。'
    },
    indications: {
      pt: ['Padrões limitantes', 'Fobias e medos', 'Motivação reduzida', 'Comunicação inadequada', 'Mudança de perspectiva', 'Otimização de performance', 'Resolução rápida de problemas'],
      en: ['Limiting patterns', 'Phobias and fears', 'Reduced motivation', 'Inadequate communication', 'Perspective change', 'Performance optimization', 'Quick problem resolution'],
      es: ['Patrones limitantes', 'Fobias y miedos', 'Motivación reducida', 'Comunicación inadequada', 'Cambio de perspectiva', 'Optimización de desempeño', 'Resolución rápida de problemas'],
      zh: ['限制模式', '恐惧症', '动力降低', '沟通不良', '观点改变', '表现优化', '快速问题解决']
    },
    indicationTags: ['linguagem', 'padrão', 'reframing', 'mudança', 'rápido'],
    contraindications: {
      pt: ['Psicose (manipulação linguística pode confundir)', 'Transtorno dissociativo grave', 'Resistência extrema a mudança', 'Falta de responsabilidade pessoal'],
      en: ['Psychosis (linguistic manipulation may confuse)', 'Severe dissociative disorder', 'Extreme resistance to change', 'Lack of personal responsibility'],
      es: ['Psicosis (manipulación lingüística puede confundir)', 'Trastorno disociativo grave', 'Resistencia extrema al cambio', 'Falta de responsabilidad personal'],
      zh: ['精神病语言操纵', '严重解离障碍', '极端改变抵制', '缺乏个人责任']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
  },
  {
    id: 'terapia-floral',
    name: { 
      pt: 'Terapia Floral', 
      en: 'Flower Therapy', 
      es: 'Terapia Floral', 
      zh: '花卉疗法' 
    },
    category: 'natural',
    description: {
      pt: 'Sistema de cura utilizando essências florais que equilibram estados emocionais. Cada flor trata emoções específicas (medo, raiva, insegurança). O mais conhecido é o sistema Bach com 38 flores. As essências são tomadas por via oral (gotas em água). Sutis mas eficazes na reprogramação emocional.',
      en: 'Healing system using floral essences to balance emotional states. Each flower treats specific emotions (fear, anger, insecurity). Best known is Bach system with 38 flowers. Essences taken orally (drops in water). Subtle but effective in emotional reprogramming.',
      es: 'Sistema de curación utilizando esencias florales que equilibran estados emocionales. Cada flor trata emociones específicas (miedo, ira, inseguridad). El más conocido es el sistema Bach con 38 flores. Las esencias se toman por vía oral (gotas en agua).',
      zh: '利用花精油平衡情感状态的治疗系统。每种花治疗特定情绪。最著名是巴赫系统。'
    },
    indications: {
      pt: ['Estados emocionais desarmoniosos', 'Ansiedade e medo', 'Raiva reprimida', 'Insegurança', 'Desânimo', 'Baixa autoestima', 'Complemento a terapias'],
      en: ['Disharmonious emotional states', 'Anxiety and fear', 'Repressed anger', 'Insecurity', 'Discouragement', 'Low self-esteem', 'Therapy complement'],
      es: ['Estados emocionales desarmoniosos', 'Ansiedad y miedo', 'Rabia reprimida', 'Inseguridad', 'Desánimo', 'Baja autoestima', 'Complemento de terapias'],
      zh: ['不和谐情感状态', '焦虑和恐惧', '压抑愤怒', '不安全感', '沮丧', '低自尊', '疗法补充']
    },
    indicationTags: ['flor', 'essência', 'emoção', 'bach', 'natural'],
    contraindications: {
      pt: ['Alergia a flores específicas (via ingestão)', 'Dependência exclusiva de essências evitando terapia necessária', 'Descrença extrema (bloqueia efeito placebo)', 'Problemas hepáticos com álcool (algumas essências contêm brandy)'],
      en: ['Allergy to specific flowers (via ingestion)', 'Exclusive essence dependency avoiding needed therapy', 'Extreme disbelief (blocks placebo effect)', 'Liver problems with alcohol (some essences contain brandy)'],
      es: ['Alergia a flores específicas (vía ingestión)', 'Dependencia exclusiva de esencias evitando terapia necesaria', 'Incredulidad extrema (bloquea efecto placebo)', 'Problemas hepáticos con alcohol (algunas esencias contienen brandy)'],
      zh: ['花粉过敏', '排他性依赖避免治疗', '极端怀疑', '肝脏问题与酒精']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1490495967868-a84b0ee5b5c4?w=600&h=400&fit=crop'
  },
  {
    id: 'taro',
    name: { 
      pt: 'Tarô', 
      en: 'Tarot', 
      es: 'Tarot', 
      zh: '塔罗' 
    },
    category: 'mind',
    description: {
      pt: 'Sistema divinatório que utiliza 78 cartas com símbolos arquetípicos para acessar intuição e sabedoria inconsciente. Um tarólogo interpreta as cartas para oferecer perspectiva sobre situações. Pode ser ferramenta de espelho psicológico ou apenas para diversão. Requer interpretação sutil.',
      en: 'Divinary system using 78 cards with archetypal symbols to access intuition and unconscious wisdom. Tarot reader interprets cards to offer perspective on situations. Can be psychological mirror tool or just for fun. Requires subtle interpretation.',
      es: 'Sistema adivinatorio que utiliza 78 cartas con símbolos arquetípicos para acceder a la intuición y la sabiduría inconsciente. Un lector de tarot interpreta las cartas para ofrecer perspectiva sobre situaciones. Puede ser herramienta de espejo psicológico o simplemente para diversión.',
      zh: '利用78张带有原型象征的卡牌来访问直觉和无意识智慧的占卜系统。塔罗师解释卡牌提供视角。'
    },
    indications: {
      pt: ['Busca de clareza em decisões', 'Exploração de dinâmicas inconscientes', 'Desenvolvimento de intuição', 'Perspectiva psicológica sobre situações', 'Meditação simbólica', 'Complemento a terapia'],
      en: ['Seeking clarity in decisions', 'Exploration of unconscious dynamics', 'Intuition development', 'Psychological perspective on situations', 'Symbolic meditation', 'Therapy complement'],
      es: ['Búsqueda de claridad en decisiones', 'Exploración de dinámicas inconscientes', 'Desarrollo de intuición', 'Perspectiva psicológica sobre situaciones', 'Meditación simbólica', 'Complemento de terapia'],
      zh: ['寻求决定清晰度', '无意识动态探索', '直觉发展', '心理视角', '象征冥想', '疗法补充']
    },
    indicationTags: ['carta', 'arquétipo', 'intuição', 'futuro', 'simbologia'],
    contraindications: {
      pt: ['Psicose com ideias de referência (cartas podem reforçar)', 'Ansiedade severa com foco em futuro', 'Tendência a decisões impulsivas baseadas em tarô', 'Superstição patológica que prejudica funcionamento'],
      en: ['Psychosis with ideas of reference (cards may reinforce)', 'Severe anxiety focused on future', 'Tendency to impulsive decisions based on tarot', 'Pathological superstition harming functioning'],
      es: ['Psicosis con ideas de referencia (cartas pueden reforzar)', 'Ansiedad severa enfocada en el futuro', 'Tendencia a decisiones impulsivas basadas en tarot', 'Superstición patológica que perjudica funcionamiento'],
      zh: ['参照观念精神病', '严重未来焦虑', '基于塔罗冲动决策', '病态迷信损害功能']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70570ec0?w=600&h=400&fit=crop'
  },
  {
    id: 'homeopatia',
    name: { 
      pt: 'Homeopatia', 
      en: 'Homeopathy', 
      es: 'Homeopatía', 
      zh: '顺势疗法' 
    },
    category: 'natural',
    description: {
      pt: 'Sistema médico que utiliza substâncias altamente diluídas para estimular o corpo a se curar. Baseia-se no princípio "semelhante cura semelhante". Os medicamentos são selecionados segundo a totalidade dos sintomas da pessoa, não apenas da doença. Muito controverso cientificamente, mas tem muitos seguidores.',
      en: 'Medical system using highly diluted substances to stimulate body self-healing. Based on "like cures like" principle. Medicines selected according to person\'s total symptom picture, not just disease. Very scientifically controversial, but has many followers.',
      es: 'Sistema médico que utiliza sustancias altamente diluidas para estimular la autocuración del cuerpo. Se basa en el principio "semejante cura semejante". Los medicamentos se seleccionan según la totalidad de los síntomas de la persona, no solo la enfermedad.',
      zh: '利用高度稀释物质刺激身体自我治愈的医疗系统。基于"相似者治愈相似者"原理。根据症状总体选择。'
    },
    indications: {
      pt: ['Doenças agudas e crônicas', 'Alergias', 'Problemas dermatológicos', 'Distúrbios emocionais', 'Prevenção', 'Complemento a alopatia', 'Casos refratários a tratamentos convencionais'],
      en: ['Acute and chronic diseases', 'Allergies', 'Dermatological problems', 'Emotional disorders', 'Prevention', 'Complement to allopathy', 'Cases refractory to conventional treatment'],
      es: ['Enfermedades agudas y crónicas', 'Alergias', 'Problemas dermatológicos', 'Trastornos emocionales', 'Prevención', 'Complemento a la alopatía', 'Casos refractarios a tratamientos convencionales'],
      zh: ['急性和慢性疾病', '过敏', '皮肤问题', '情感障碍', '预防', '对症疗法补充', '难治病例']
    },
    indicationTags: ['diluição', 'semelhante', 'cura', 'totalidade', 'natural'],
    contraindications: {
      pt: ['Emergências médicas agudas (requer medicina alopática)', 'Recusa em fazer tratamento médico necessário', 'Expectativa de cura rápida em doenças graves', 'Dependência exclusiva em doenças infectocontagiosas'],
      en: ['Acute medical emergencies (requires allopathic medicine)', 'Refusal to undergo necessary medical treatment', 'Expectation of quick healing in serious diseases', 'Exclusive dependency in infectious diseases'],
      es: ['Emergencias médicas agudas (requiere medicina alopática)', 'Rechazo a someterse a tratamiento médico necesario', 'Expectativa de curación rápida en enfermedades graves', 'Dependencia exclusiva en enfermedades infectocontagiosas'],
      zh: ['急性医学紧急情况', '拒绝必要的医疗', '严重疾病快速治愈期望', '传染病排他性依赖']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0b?w=600&h=400&fit=crop'
  },
  {
    id: 'iridologia',
    name: { 
      pt: 'Iridologia', 
      en: 'Iridology', 
      es: 'Iridología', 
      zh: '虹膜学' 
    },
    category: 'natural',
    description: {
      pt: 'Sistema de diagnóstico que estuda a íris do olho para identificar desequilíbrios de saúde. Cada zona da íris corresponde a um órgão. O iridólogo mapeia descolorações e padrões para diagnosticar. É complementar e não substitui exames convencionais. Muito valorizada na medicina naturopata.',
      en: 'Diagnostic system studying iris to identify health imbalances. Each iris zone corresponds to organ. Iridologist maps discolorations and patterns to diagnose. Complementary and doesn\'t replace conventional tests. Highly valued in naturopathic medicine.',
      es: 'Sistema de diagnóstico que estudia el iris del ojo para identificar desequilibrios de salud. Cada zona del iris corresponde a un órgano. El iridólogo mapea decoloraciones y patrones para diagnosticar. Es complementario y no sustituye exámenes convencionales.',
      zh: '通过研究眼睛虹膜来识别健康失衡的诊断系统。虹膜的每个区域对应一个器官。虹膜学家绘制图案。'
    },
    indications: {
      pt: ['Diagnóstico preventivo', 'Identificação de órgãos fragilizados', 'Análise do padrão constitucional', 'Investigação de causa raiz de doenças', 'Complemento a diagnóstico convencional'],
      en: ['Preventive diagnosis', 'Identification of weakened organs', 'Constitutional pattern analysis', 'Investigation of disease root cause', 'Complement to conventional diagnosis'],
      es: ['Diagnóstico preventivo', 'Identificación de órganos fragilizados', 'Análisis del patrón constitucional', 'Investigación de causa raíz de enfermedades', 'Complemento a diagnóstico convencional'],
      zh: ['预防诊断', '识别虚弱器官', '体质模式分析', '疾病根本原因调查', '常规诊断补充']
    },
    indicationTags: ['íris', 'diagnóstico', 'órgão', 'preventivo', 'mapa'],
    contraindications: {
      pt: ['Diagnóstico exclusivo (deve ser complementar)', 'Doenças que requerem diagnóstico médico urgente', 'Desconfiança em iridologia (impede análise)', 'Doenças oftalmológicas que mudam aparência da íris'],
      en: ['Exclusive diagnosis (must be complementary)', 'Diseases requiring urgent medical diagnosis', 'Distrust in iridology (prevents analysis)', 'Ophthalmological diseases changing iris appearance'],
      es: ['Diagnóstico exclusivo (debe ser complementario)', 'Enfermedades que requieren diagnóstico médico urgente', 'Desconfianza en iridología (impide análisis)', 'Enfermedades oftalmológicas que cambian la apariencia del iris'],
      zh: ['排他性诊断', '需要紧急医学诊断', '对虹膜学不信任', '眼科疾病改变虹膜']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1606573261181-0e5f5c4d7846?w=600&h=400&fit=crop'
  },
  {
    id: 'nutricao-funcional',
    name: { 
      pt: 'Nutrição Funcional', 
      en: 'Functional Nutrition', 
      es: 'Nutrición Funcional', 
      zh: '功能性营养' 
    },
    category: 'natural',
    description: {
      pt: 'Abordagem nutricional que vai além da recomendação de calorias. Estuda como alimentos afetam a função celular, inflamação, microbioma e hormônios. O nutricionista funcional prescreve alimentos e suplementos específicos para recuperação e otimização de saúde. Muito integrada a outras terapias.',
      en: 'Nutritional approach going beyond calorie recommendation. Studies how foods affect cellular function, inflammation, microbiome and hormones. Functional nutritionist prescribes specific foods and supplements for recovery and health optimization.',
      es: 'Enfoque nutricional que va más allá de la recomendación de calorías. Estudia cómo los alimentos afectan la función celular, inflamación, microbioma y hormonas. El nutricionista funcional prescribe alimentos y suplementos específicos para recuperación y optimización de salud.',
      zh: '超越卡路里推荐的营养方法。研究食物如何影响细胞功能、炎症、微生物群和激素。'
    },
    indications: {
      pt: ['Inflamação crônica', 'Desequilíbrio hormonal', 'Problemas digestivos', 'Recuperação de cirurgias/traumas', 'Otimização de performance', 'Síndrome do intestino permeável', 'Reequilíbrio metabólico'],
      en: ['Chronic inflammation', 'Hormonal imbalance', 'Digestive problems', 'Surgery/trauma recovery', 'Performance optimization', 'Leaky gut syndrome', 'Metabolic rebalancing'],
      es: ['Inflamación crónica', 'Desequilibrio hormonal', 'Problemas digestivos', 'Recuperación de cirugías/traumas', 'Optimización de rendimiento', 'Síndrome del intestino permeable', 'Reequilibrio metabólico'],
      zh: ['慢性炎症', '荷尔蒙失调', '消化问题', '手术创伤恢复', '表现优化', '肠漏综合征', '代谢重新平衡']
    },
    indicationTags: ['alimento', 'função', 'célula', 'nutrição', 'saúde'],
    contraindications: {
      pt: ['Transtorno alimentar grave (requer abordagem psicológica primeiro)', 'Obsessão por dieta perfeita', 'Ortoexia', 'Dependência exclusiva evitando medicação necessária'],
      en: ['Severe eating disorder (requires psychological approach first)', 'Obsession with perfect diet', 'Orthorexia', 'Exclusive dependency avoiding needed medication'],
      es: ['Trastorno alimentario grave (requiere enfoque psicológico primero)', 'Obsesión con dieta perfecta', 'Ortorexia', 'Dependencia exclusiva evitando medicación necesaria'],
      zh: ['严重进食障碍', '完美饮食强迫', '正念饮食强迫症', '排他性依赖']
    },
    modality: 'presencial_online',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop'
  },
  {
    id: 'resgate-alma',
    name: { 
      pt: 'Resgate de Alma', 
      en: 'Soul Retrieval', 
      es: 'Rescate de Alma', 
      zh: '灵魂救赎' 
    },
    category: 'mind',
    description: {
      pt: 'Prática xamânica que visa recuperar partes da essência/alma perdidas por trauma. Acredita-se que quando vivemos traumas severos, partes de nós "fogem" para se proteger. O xamã viaja aos planos espirituais para resgatar essas partes e reintegrá-las. Profundamente transformativo para traumas.',
      en: 'Shamanic practice aiming to recover parts of essence/soul lost to trauma. Believed that when we experience severe trauma, parts of us "flee" for protection. Shaman travels to spiritual planes to rescue and reintegrate parts. Profoundly transformative for trauma.',
      es: 'Práctica chamánica que busca recuperar partes de la esencia/alma perdidas por trauma. Se cree que cuando experimentamos traumas severos, partes de nosotros "huyen" para protegerse. El chamán viaja a planos espirituales para rescatar y reintegrar esas partes.',
      zh: '旨在恢复由创伤丧失的灵魂部分的萨满实践。相信严重创伤时，我们的部分逃离以保护自己。萨满到精神位面拯救和重新整合。'
    },
    indications: {
      pt: ['Trauma e TEPT severos', 'Sensação de fragmentação pessoal', 'Dissociação', 'Perda de vitalidade sem causa clara', 'Sensação de "não estar inteiro"', 'Recuperação profunda após abusos', 'Integração de experiências'],
      en: ['Severe trauma and PTSD', 'Feeling of personal fragmentation', 'Dissociation', 'Loss of vitality without clear cause', 'Feeling "not whole"', 'Deep recovery after abuse', 'Experience integration'],
      es: ['Trauma y TEPT severos', 'Sensación de fragmentación personal', 'Disociación', 'Pérdida de vitalidad sin causa clara', 'Sensación de "no estar completo"', 'Recuperación profunda después de abusos', 'Integración de experiencias'],
      zh: ['严重创伤和创伤后应激障碍', '人格碎片化感', '解离', '原因不明的活力丧失', '不完整感', '深度创伤恢复', '体验整合']
    },
    indicationTags: ['alma', 'trauma', 'xamã', 'integração', 'cura'],
    contraindications: {
      pt: ['Psicose em descompensação (pode confundir alucinações)', 'Desconfiança extrema em espiritualidade', 'Crise depressiva severa (requer estabilização primeiro)', 'Transtorno de personalidade sem motivação genuína'],
      en: ['Decompensated psychosis (may confuse hallucinations)', 'Extreme distrust in spirituality', 'Severe depressive crisis (requires stabilization first)', 'Personality disorder without genuine motivation'],
      es: ['Psicosis descompensada (puede confundir alucinaciones)', 'Desconfianza extrema en espiritualidad', 'Crisis depresiva severa (requiere estabilización primero)', 'Trastorno de personalidad sin motivación genuina'],
      zh: ['失控精神病', '对灵性极端不信任', '严重抑郁危机', '人格障碍']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop'
  },
  {
    id: 'roda-cura',
    name: { 
      pt: 'Roda de Cura', 
      en: 'Healing Circle', 
      es: 'Rueda de Curación', 
      zh: '治愈之轮' 
    },
    category: 'mind',
    description: {
      pt: 'Círculo terapêutico em grupo onde participantes compartilham experiências e recebem apoio comunitário. Baseada em tradições indígenas, a roda promove igualdade, escuta atenta e cura coletiva. Cada pessoa tem espaço para falar sem interrupção. Muito eficaz para isolamento e conexão humana.',
      en: 'Therapeutic group circle where participants share experiences and receive community support. Based on indigenous traditions, circle promotes equality, attentive listening and collective healing. Each person has space to speak uninterrupted. Very effective for isolation and human connection.',
      es: 'Círculo terapéutico grupal donde los participantes comparten experiencias y reciben apoyo comunitario. Basado en tradiciones indígenas, el círculo promueve igualdad, escucha atenta y curación colectiva. Cada persona tiene espacio para hablar sin interrupciones.',
      zh: '参与者分享经历并接收社区支持的治疗小组圆圈。基于土著传统，圆圈促进平等和集体治愈。'
    },
    indications: {
      pt: ['Isolamento social', 'Falta de comunidade', 'Luto coletivo', 'Compartilhamento de traumas', 'Conexão humana', 'Fortalecimento de relacionamentos', 'Cicatrização de grupo'],
      en: ['Social isolation', 'Lack of community', 'Collective grief', 'Trauma sharing', 'Human connection', 'Relationship strengthening', 'Group healing'],
      es: ['Aislamiento social', 'Falta de comunidad', 'Duelo colectivo', 'Compartición de traumas', 'Conexión humana', 'Fortalecimiento de relaciones', 'Cicatrización de grupo'],
      zh: ['社会隔离', '缺乏社区', '集体哀伤', '创伤分享', '人际连接', '关系强化', '群体治愈']
    },
    indicationTags: ['grupo', 'círculo', 'comunidade', 'cura', 'escuta'],
    contraindications: {
      pt: ['Paranoia severa (medo de grupo)', 'Transtorno de personalidade com necessidade de controle extremo', 'Psicose com ideias de referência (pode intensificar)', 'Recusa em participar genuinamente', 'Problemas graves de comunicação não tratados'],
      en: ['Severe paranoia (fear of group)', 'Personality disorder with need for extreme control', 'Psychosis with ideas of reference (may intensify)', 'Refusal to genuinely participate', 'Serious untreated communication problems'],
      es: ['Paranoia severa (miedo al grupo)', 'Trastorno de personalidad con necesidad de control extremo', 'Psicosis con ideas de referencia (puede intensificar)', 'Rechazo a participar genuinamente', 'Problemas graves de comunicación no tratados'],
      zh: ['严重偏执狂恐惧', '极端控制人格障碍', '参照观念精神病', '拒绝真正参与', '严重沟通障碍']
    },
    modality: 'presencial',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop'
  },
{
  id: 'dancaterapia',
  name: { 
    pt: 'Dançaterapia', 
    en: 'Dance Therapy', 
    es: 'Danzaterapia', 
    zh: '舞蹈治疗' 
  },
  category: 'body',
  description: {
    pt: 'Abordagem integrativa que utiliza o movimento e a dança como forma de expressão e cura emocional. Facilita a integração corpo-mente, libera emoções reprimidas e promove autoconfiança. Não exige experiência prévia em dança.',
    en: 'Integrative approach using movement and dance for emotional expression and healing. Facilitates body-mind integration, releases suppressed emotions and promotes self-confidence.',
    es: 'Enfoque integrativo que utiliza el movimiento y la danza para la expresión emocional y la curación. Facilita la integración cuerpo-mente.',
    zh: '通过舞蹈和运动进行情感表达和治愈的整体方法。促进身心整合和自信。'
  },
  indications: {
    pt: ['Depressão e tristeza', 'Baixa autoestima e timidez', 'Traumas emocionais', 'Rigidez corporal e postural', 'Falta de expressão criativa', 'Ansiedade social', 'Desconexão com o corpo'],
    en: ['Depression and sadness', 'Low self-esteem and shyness', 'Emotional traumas', 'Postural rigidity', 'Lack of creative expression', 'Social anxiety', 'Body disconnection'],
    es: ['Depresión y tristeza', 'Baja autoestima', 'Traumas emocionales', 'Rigidez postural', 'Falta de creatividad', 'Ansiedad social', 'Desconexión corporal'],
    zh: ['抑郁症', '低自尊', '情感创伤', '姿态僵硬', '缺乏创意', '社交焦虑', '身体脱节']
  },
  indicationTags: ['movimento', 'expressão', 'emoção', 'corpo', 'criatividade'],
  contraindications: {
    pt: ['Fraturas ou lesões graves em membros', 'Desordem psicótica severa', 'Vertigem ou tontura intensa', 'Incapacidade de movimento severa', 'Fobia extrema a contato físico'],
    en: ['Severe fractures or limb injuries', 'Severe psychotic disorder', 'Intense dizziness or vertigo', 'Severe movement incapacity', 'Extreme fear of physical contact'],
    es: ['Fracturas graves', 'Psicosis severa', 'Vértigo intenso', 'Incapacidad de movimiento', 'Miedo al contacto físico'],
    zh: ['严重骨折', '严重精神病', '眩晕', '运动障碍', '接触恐惧症']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=600&h=400&fit=crop'
},
{
  id: 'johrei',
  name: { 
    pt: 'Johrei', 
    en: 'Johrei', 
    es: 'Johrei', 
    zh: '浄霊' 
  },
  category: 'energy',
  description: {
    pt: 'Transmissão de luz espiritual japonesa que purifica o corpo e espírito. Realizada através de movimento de mão sem toque direto, transmitindo energia divina. Busca eliminar toxinas espirituais e restaurar a saúde integral.',
    en: 'Japanese spiritual light transmission that purifies body and spirit. Performed through hand movements without direct contact, transmitting divine energy to eliminate spiritual toxins.',
    es: 'Transmisión de luz espiritual japonesa que purifica el cuerpo y el espíritu. Se realiza sin contacto directo.',
    zh: '日本精神光传输，通过手部运动净化身心。消除精神毒素，恢复整体健康。'
  },
  indications: {
    pt: ['Sensação de peso espiritual', 'Queda energética', 'Impurezas corporais', 'Mal-estar sem causa aparente', 'Desequilíbrio espiritual', 'Necessidade de limpeza energética', 'Desejo de conexão espiritual'],
    en: ['Spiritual heaviness', 'Energy drain', 'Bodily impurities', 'Unexplained discomfort', 'Spiritual imbalance', 'Need for energy cleansing', 'Desire for spiritual connection'],
    es: ['Pesadez espiritual', 'Drenaje energético', 'Impurezas corporales', 'Malestar sin causa', 'Desequilibrio espiritual', 'Limpieza energética', 'Conexión espiritual'],
    zh: ['灵性沉重感', '能量耗尽', '身体杂质', '不明原因不适', '灵性失衡', '能量清洁', '灵性连接']
  },
  indicationTags: ['luz', 'purificación', 'espíritu', 'energía', 'divino'],
  contraindications: {
    pt: ['Pessoas com ceticismo extremo', 'Psicose não tratada', 'Expectativa de cura mágica instantânea', 'Dependência exclusiva (não substitui medicina)', 'Rejeição total de práticas espirituais'],
    en: ['Extreme skepticism', 'Untreated psychosis', 'Expectation of instant magical healing', 'Cannot replace medical treatment', 'Total rejection of spiritual practices'],
    es: ['Escepticismo extremo', 'Psicosis no tratada', 'Expectativa de curación mágica', 'No sustituye medicina', 'Rechazo a lo espiritual'],
    zh: ['极度怀疑', '未治疗的精神病', '期待魔法治愈', '不可替代医疗', '拒绝精神实践']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop'
},
{
  id: 'magnified-healing',
  name: { 
    pt: 'Magnified Healing', 
    en: 'Magnified Healing', 
    es: 'Curación Magnificada', 
    zh: '放大治疗' 
  },
  category: 'energy',
  description: {
    pt: 'Modalidade de cura energética de frequência elevada que utiliza símbolos sagrados e intenção. Trabalha com a energia divina amplificada para transmutação de bloqueios. Não requer toque físico e funciona muito bem remotamente.',
    en: 'High-frequency energy healing modality using sacred symbols and intention. Works with amplified divine energy for transmutation of blockages. No physical touch required, works excellently remotely.',
    es: 'Modalidad de curación energética de alta frecuencia usando símbolos sagrados. Transmutación de bloqueos sin contacto físico.',
    zh: '使用神圣符号和意图的高频能量治疗。通过放大的神圣能量进行转化。'
  },
  indications: {
    pt: ['Bloqueios energéticos profundos', 'Baixa vibração pessoal', 'Traumas ancestrais', 'Conexão fraca com propósito', 'Resistência ao fluxo de abundância', 'Desejo de elevação espiritual', 'Síndrome do impostor'],
    en: ['Deep energy blockages', 'Low personal vibration', 'Ancestral traumas', 'Weak connection to purpose', 'Resistance to abundance flow', 'Desire for spiritual elevation', 'Imposter syndrome'],
    es: ['Bloqueos energéticos profundos', 'Vibración baja personal', 'Traumas ancestrales', 'Conexión débil al propósito', 'Resistencia a la abundancia', 'Elevación espiritual', 'Síndrome del impostor'],
    zh: ['深层能量阻滞', '低频振动', '祖先创伤', '目标连接弱', '丰富阻力', '灵性提升', '冒牌货综合症']
  },
  indicationTags: ['símbolos', 'frequência', 'transmutação', 'sagrado', 'elevação'],
  contraindications: {
    pt: ['Desconexão total de crenças espirituais', 'Distúrbios psicóticos agudos', 'Falta de receptividade', 'Expectativa de "solução rápida"', 'Uso como substituto de psicoterapia'],
    en: ['Total disconnection from spiritual beliefs', 'Acute psychotic disorders', 'Lack of receptivity', 'Expectation of "quick fix"', 'Use as substitute for psychotherapy'],
    es: ['Total desconexión espiritual', 'Psicosis aguda', 'Falta de receptividad', 'Expectativa rápida', 'Sustitución de psicoterapia'],
    zh: ['完全灵性断开', '急性精神病', '缺乏接受性', '期待快速解决', '替代心理治疗']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1517511620798-cdc3fbaa9900?w=600&h=400&fit=crop'
},
{
  id: 'terapia-multidimensional',
  name: { 
    pt: 'Terapia Multidimensional', 
    en: 'Multidimensional Therapy', 
    es: 'Terapia Multidimensional', 
    zh: '多维疗法' 
  },
  category: 'energy',
  description: {
    pt: 'Terapia energética que trabalha com presença de seres de luz e guias espirituais. Atua no coração como centro de cura, utilizando amor incondicional como ferramenta terapêutica. Combinação de meditação guiada com transmissão de energia cósmica.',
    en: 'Energy therapy working with light beings and spiritual guides. Acts through the heart as healing center, using unconditional love as therapeutic tool. Combines guided meditation with cosmic energy transmission.',
    es: 'Terapia energética que trabaja con seres de luz. Utiliza el corazón como centro de curación con amor incondicional.',
    zh: '与光之存有合作的能量疗法。以心脏为治疗中心，使用无条件的爱作为治疗工具。'
  },
  indications: {
    pt: ['Falta de amor-próprio', 'Desconexão espiritual profunda', 'Dor emocional crônica', 'Busca por sentido existencial', 'Isolamento espiritual', 'Feridas do coração não cicatrizadas', 'Busca por conexão transcendental'],
    en: ['Lack of self-love', 'Deep spiritual disconnection', 'Chronic emotional pain', 'Search for existential meaning', 'Spiritual isolation', 'Unhealed heart wounds', 'Search for transcendental connection'],
    es: ['Falta de amor propio', 'Desconexión espiritual', 'Dolor emocional crónico', 'Búsqueda de sentido existencial', 'Aislamiento espiritual', 'Heridas del corazón', 'Conexión transcendental'],
    zh: ['缺乏自爱', '深层灵性断开', '慢性情感痛苦', '存在意义寻求', '灵性孤立', '心伤', '超越连接']
  },
  indicationTags: ['coração', 'luz', 'guias', 'multidimensional', 'amor'],
  contraindications: {
    pt: ['Negação total de realidades não materiais', 'Psicose ativa', 'Dificuldade com visões ou alucinações', 'Falta de consentimento informado', 'Uso exclusivo sem suporte psicológico em traumas graves'],
    en: ['Total denial of non-material realities', 'Active psychosis', 'Difficulty with visions or hallucinations', 'Lack of informed consent', 'Exclusive use without psychological support in severe trauma'],
    es: ['Negación total de realidades no materiales', 'Psicosis activa', 'Dificultad con visiones', 'Sin consentimiento informado', 'Sin apoyo psicológico en traumas'],
    zh: ['完全否定非物质现实', '活跃精神病', '视幻困难', '无知情同意', '无心理支持']
  },
  modality: 'online',
  image: 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop'
},
{
  id: 'musicoterapia',
  name: { 
    pt: 'Musicoterapia', 
    en: 'Music Therapy', 
    es: 'Musicoterapia', 
    zh: '音乐治疗' 
  },
  category: 'mind',
  description: {
    pt: 'Uso clínico da música e seus elementos (ritmo, melodia, harmonia) para atingir objetivos terapêuticos. Pode incluir escuta receptiva, criação de música ou movimentação. Afeta diretamente o sistema nervoso e as emoções.',
    en: 'Clinical use of music and its elements (rhythm, melody, harmony) to achieve therapeutic goals. Can include receptive listening, music creation or movement. Directly affects nervous system and emotions.',
    es: 'Uso clínico de la música y sus elementos para objetivos terapéuticos. Afecta directamente al sistema nervoso y emociones.',
    zh: '使用音乐及其元素（节奏、旋律、和谐）实现治疗目标。直接影响神经系统和情绪。'
  },
  indications: {
    pt: ['Depressão e distúrbios de humor', 'Demência e Alzheimer', 'Autismo', 'Paralisia cerebral', 'Stress e ansiedade', 'Problemas de aprendizagem', 'Reabilitação neuromotora'],
    en: ['Depression and mood disorders', 'Dementia and Alzheimer\'s', 'Autism', 'Cerebral palsy', 'Stress and anxiety', 'Learning problems', 'Neuromotor rehabilitation'],
    es: ['Depresión y trastornos del humor', 'Demencia y Alzheimer', 'Autismo', 'Parálisis cerebral', 'Estrés y ansiedad', 'Problemas de aprendizaje', 'Rehabilitación neuromotora'],
    zh: ['抑郁症', '痴呆症', '自闭症', '脑瘫', '压力和焦虑', '学习问题', '神经运动康复']
  },
  indicationTags: ['música', 'ritmo', 'som', 'emoção', 'neurológico'],
  contraindications: {
    pt: ['Trauma relacionado a sons específicos', 'Misofonia severa (ódio ao som)', 'Crises epilépticas desencadeadas por luz/som', 'Alergia ao barulho (hipersensibilidade severa)', 'Rejeição total da música como tratamento'],
    en: ['Trauma related to specific sounds', 'Severe misophonia (sound hatred)', 'Epileptic seizures triggered by light/sound', 'Sound allergy (severe hypersensitivity)', 'Total rejection of music as treatment'],
    es: ['Trauma relacionado a sonidos', 'Misofonia severa', 'Epilepsia desencadenada por sonido', 'Alergia al sonido', 'Rechazo total de música'],
    zh: ['声音相关创伤', '重度厌音症', '声光诱发癫痫', '声敏感', '拒绝音乐治疗']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&h=400&fit=crop'
},
{
  id: 'psicanálise-integrativa',
  name: { 
    pt: 'Psicanálise Integrativa', 
    en: 'Integrative Psychoanalysis', 
    es: 'Psicoanálisis Integrativo', 
    zh: '整合心理分析' 
  },
  category: 'mind',
  description: {
    pt: 'Abordagem psicanalítica que integra técnicas da psicanálise freudiana/junguiana com práticas holísticas. Trabalha o inconsciente através do diálogo terapêutico e respeitando a visão integral da pessoa. Mais adaptável e acessível que psicanálise tradicional.',
    en: 'Psychoanalytic approach integrating Freudian/Jungian techniques with holistic practices. Works the unconscious through therapeutic dialogue while respecting integral person view. More adaptable than traditional psychoanalysis.',
    es: 'Enfoque psicoanalítico que integra técnicas freudianas/junguianas con prácticas holísticas. Trabaja el inconsciente respetando la visión integral.',
    zh: '整合弗洛伊德/荣格技术与整体实践的心理分析方法。通过治疗对话处理无意识。'
  },
  indications: {
    pt: ['Traumas psicológicos profundos', 'Padrões repetitivos de relacionamento', 'Autoconhecimento avançado', 'Conflitos edipianos ou maternos', 'Integração de sombra pessoal', 'Neuroses crônicas', 'Busca de significado existencial'],
    en: ['Deep psychological traumas', 'Repetitive relationship patterns', 'Advanced self-knowledge', 'Oedipal or maternal conflicts', 'Integration of personal shadow', 'Chronic neuroses', 'Search for existential meaning'],
    es: ['Traumas psicológicos profundos', 'Patrones repetitivos en relaciones', 'Autoconocimiento avanzado', 'Conflictos edípicos', 'Integración de la sombra', 'Neurosis crónicas', 'Significado existencial'],
    zh: ['深层心理创伤', '重复关系模式', '高级自我认识', '俄狄浦斯冲突', '阴影整合', '慢性神经症', '存在意义']
  },
  indicationTags: ['inconsciente', 'psique', 'padrões', 'análise', 'integração'],
  contraindications: {
    pt: ['Psicose não tratada', 'Transtorno bipolar não medicado', 'Risco imediato de suicídio', 'Demência avançada', 'Incapacidade de insight pessoal'],
    en: ['Untreated psychosis', 'Unmedicated bipolar disorder', 'Immediate suicide risk', 'Advanced dementia', 'Inability for personal insight'],
    es: ['Psicosis no tratada', 'Bipolaridad sin medicación', 'Riesgo de suicidio', 'Demencia avanzada', 'Incapacidad de insight'],
    zh: ['未治疗的精神病', '未用药的双极症', '自杀风险', '晚期痴呆', '无洞察力']
  },
  modality: 'online',
  image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
},
{
  id: 'psicologia-transpessoal',
  name: { 
    pt: 'Psicologia Transpessoal', 
    en: 'Transpersonal Psychology', 
    es: 'Psicología Transpersonal', 
    zh: '超个人心理学' 
  },
  category: 'mind',
  description: {
    pt: 'Abordagem psicológica que integra experiências espirituais, transcendentes e místicas ao processo de cura. Reconhece que o crescimento pessoal vai além do ego. Trabalha com estados alterados de consciência de forma segura e supervisada.',
    en: 'Psychological approach integrating spiritual, transcendent and mystical experiences into healing. Recognizes that personal growth goes beyond ego. Works with altered states of consciousness safely and supervised.',
    es: 'Enfoque psicológico que integra experiencias espirituales y trascendentes en la curación. Reconoce el crecimiento más allá del ego.',
    zh: '将精神、超越和神秘体验整合到治疗过程中的心理学方法。认识到个人成长超越自我。'
  },
  indications: {
    pt: ['Crise espiritual ou "Dark Night of the Soul"', 'Experiências místicas confusas', 'Despertar espiritual acelerado', 'Integração de experiências enteógenas', 'Busca de conexão com sagrado', 'Depressão existencial', 'Busca por propósito transcendental'],
    en: ['Spiritual crisis or "Dark Night of the Soul"', 'Confusing mystical experiences', 'Accelerated spiritual awakening', 'Integration of entheogenic experiences', 'Search for connection with the sacred', 'Existential depression', 'Search for transcendental purpose'],
    es: ['Crisis espiritual', 'Experiencias místicas confusas', 'Despertar espiritual acelerado', 'Integración de experiencias enteógenas', 'Conexión con lo sagrado', 'Depresión existencial', 'Propósito transcendental'],
    zh: ['灵性危机', '困惑的神秘体验', '加速灵性觉醒', '迷幻体验整合', '与神圣连接', '存在抑郁', '超越目标']
  },
  indicationTags: ['transcendente', 'espiritual', 'psique', 'consciência', 'sagrado'],
  contraindications: {
    pt: ['Psicose ativa ou esquizofrenia', 'Transtorno de personalidade não tratado', 'Uso ativo de drogas pesadas', 'Falta total de estabilidade emocional', 'Coerção ou pressão externa para "despertar espiritual"'],
    en: ['Active psychosis or schizophrenia', 'Untreated personality disorder', 'Active heavy drug use', 'Lack of emotional stability', 'Coercion or external pressure for "spiritual awakening"'],
    es: ['Psicosis activa o esquizofrenia', 'Trastorno de personalidad no tratado', 'Uso de drogas pesadas', 'Falta de estabilidad emocional', 'Presión para "despertar"'],
    zh: ['活跃精神病或精神分裂症', '未治疗的人格障碍', '重度吸毒', '情绪不稳定', '外部压力觉醒']
  },
  modality: 'online',
  image: 'https://images.unsplash.com/photo-1528809332179-6db94df7e121?w=600&h=400&fit=crop'
},
{
  id: 'terapia-ortomolecular',
  name: { 
    pt: 'Terapia Ortomolecular', 
    en: 'Orthomolecular Therapy', 
    es: 'Terapia Ortomolecular', 
    zh: '正分子疗法' 
  },
  category: 'natural',
  description: {
    pt: 'Sistema de saúde que foca no equilíbrio químico molecular do corpo através de vitaminas, minerais, aminoácidos e suplementos. Busca ótima nutrição celular para prevenir e tratar doenças. Recomenda análises de deficiências nutricionais personalizadas.',
    en: 'Health system focusing on molecular chemical balance through vitamins, minerals, amino acids and supplements. Seeks optimal cellular nutrition to prevent and treat diseases. Recommends personalized nutritional deficiency analysis.',
    es: 'Sistema de salud que enfoca el equilibrio químico molecular con vitaminas, minerales y aminoácidos. Busca nutrición óptima a nivel celular.',
    zh: '通过维生素、矿物质、氨基酸和补充剂关注分子化学平衡的健康系统。寻求最优细胞营养。'
  },
  indications: {
    pt: ['Deficiências nutricionais comprovadas', 'Doença mental (depressão, ansiedade, esquizofrenia)', 'Fadiga crônica e baixa energia', 'Problemas imunológicos recorrentes', 'Artrite e inflamação crônica', 'Autismo e TDAH', 'Envelhecimento acelerado'],
    en: ['Proven nutritional deficiencies', 'Mental illness (depression, anxiety, schizophrenia)', 'Chronic fatigue and low energy', 'Recurrent immune problems', 'Arthritis and chronic inflammation', 'Autism and ADHD', 'Accelerated aging'],
    es: ['Deficiencias nutricionales comprobadas', 'Enfermedad mental', 'Fatiga crónica', 'Problemas inmunológicos', 'Artritis e inflamación', 'Autismo y TDAH', 'Envejecimiento acelerado'],
    zh: ['营养缺陷', '精神疾病', '慢性疲劳', '免疫问题', '关节炎', '自闭症和多动症', '加速衰老']
  },
  indicationTags: ['nutrição', 'moléculas', 'vitaminas', 'suplementos', 'células'],
  contraindications: {
    pt: ['Insuficiência renal grave', 'Hemofilia', 'Uso de anticoagulantes (sem monitoramento)', 'Hipervitaminose pré-existente', 'Alergia a suplementos específicos'],
    en: ['Severe renal insufficiency', 'Hemophilia', 'Anticoagulant use (without monitoring)', 'Pre-existing hypervitaminosis', 'Allergy to specific supplements'],
    es: ['Insuficiencia renal grave', 'Hemofilia', 'Uso de anticoagulantes', 'Hipervitaminosis preexistente', 'Alergia a suplementos'],
    zh: ['重度肾功能不全', '血友病', '抗凝血剂使用', '预先存在的维生素过剩', '补充剂过敏']
  },
  modality: 'online',
  image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde0b?w=600&h=400&fit=crop'
}
]

export const categories = [
  { id: 'body', name: { pt: 'Terapias Corporais', en: 'Body Therapies', es: 'Terapias Corporales', zh: '身体疗法' } },
  { id: 'energy', name: { pt: 'Terapias Energéticas', en: 'Energy Therapies', es: 'Terapias Energéticas', zh: '能量疗法' } },
  { id: 'mind', name: { pt: 'Terapias da Mente', en: 'Mind Therapies', es: 'Terapias Mentales', zh: '心灵疗法' } },
  { id: 'natural', name: { pt: 'Terapias Naturais', en: 'Natural Therapies', es: 'Terapias Naturales', zh: '自然疗法' } }
]
