Não exatamente. A lista anterior seguiu o formato visual, mas **não atendeu à densidade de informações** que você especificou nestas novas instruções.

Aqui estão as principais diferenças entre o que foi gerado e o que você pediu agora:

1. **Indicações:** A anterior tinha média de 3 itens; a nova exige **5 a 7**.
2. **Contraindicações:** A anterior tinha 1 a 2 itens; a nova exige **3 a 5**.
3. **Descrição:** A anterior era de 1 frase longa; a nova pede **2 a 3 frases**.

Abaixo, refiz a lista completa (**revisada e expandida**) para cumprir rigorosamente essas novas regras, pronta para o seu aplicativo:

```javascript
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
  image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&h=300&fit=crop'
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
    en: ['Acute indigestion', 'High fever', 'Menstruation (for massage)', 'High-risk pregnancy', 'Extreme weakness'],
    es: ['Indigestión aguda', 'Fiebre alta', 'Menstruación (para masajes)', 'Embarazo de riesgo', 'Debilidad extrema'],
    zh: ['急性消化不良', '高烧', '月经（按摩）', '高危妊娠', '极度虚弱']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=500&h=300&fit=crop'
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
    en: 'Gentle body therapy focusing on digesting emotional stress, using a stethoscope to monitor peristalsis. It aims to restore vital energy flow and dissolve muscle armor.',
    es: 'Terapia corporal suave que se centra en la digestión del estrés emocional, utilizando un estetoscopio para monitorear la peristalsis. Su objetivo es restaurar el flujo de energía vital.',
    zh: '温和的身体疗法，专注于消化情绪压力，旨在恢复生命能量流动。'
  },
  indications: {
    pt: ['Estresse pós-traumático', 'Distúrbios psicossomáticos', 'Ansiedade crônica', 'Tensão muscular rígida', 'Dificuldade de relaxamento', 'Bloqueios emocionais', 'Problemas digestivos nervosos'],
    en: ['PTSD', 'Psychosomatic disorders', 'Chronic anxiety', 'Muscle tension', 'Relaxation difficulty', 'Emotional blocks', 'Nervous digestion'],
    es: ['TEPT', 'Trastornos psicosomáticos', 'Ansiedad crónica', 'Tensión muscular', 'Dificultad para relajarse', 'Bloqueos emocionales', 'Digestión nerviosa'],
    zh: ['创伤后应激障碍', '身心疾病', '慢性焦虑', '肌肉紧张', '放松困难', '情绪阻滞', '神经性消化']
  },
  indicationTags: ['psicossomatica', 'relaxamento', 'massagem', 'emoções', 'toque'],
  contraindications: {
    pt: ['Processos psicóticos agudos', 'Infecções inflamatórias agudas', 'Febre', 'Primeiro trimestre de gravidez', 'Trombose venosa profunda'],
    en: ['Acute psychosis', 'Acute inflammation', 'Fever', 'First trimester pregnancy', 'Deep vein thrombosis'],
    es: ['Psicosis aguda', 'Inflamación aguda', 'Fiebre', 'Primer trimestre de embarazo', 'Trombosis venosa'],
    zh: ['急性精神病', '急性炎症', '发烧', '怀孕初期', '深静脉血栓']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&h=300&fit=crop'
},
{
  id: 'chi-kung',
  name: { 
    pt: 'Chi Kung (Qi Gong)', 
    en: 'Qi Gong', 
    es: 'Chi Kung', 
    zh: '气功' 
  },
  category: 'body',
  description: {
    pt: 'Prática chinesa de cultivo da energia vital através de movimentos lentos, respiração rítmica e foco mental. Atua preventivamente fortalecendo o sistema imunológico e a vitalidade. É considerado uma meditação em movimento acessível a todas as idades.',
    en: 'Chinese practice of cultivating vital energy through slow movements, rhythmic breathing, and mental focus. It strengthens the immune system and vitality.',
    es: 'Práctica china de cultivo de energía vital a través de movimientos lentos, respiración rítmica y enfoque mental. Fortalece el sistema inmunológico y la vitalidad.',
    zh: '通过缓慢运动、节奏呼吸和精神集中培养生命能量的中国习俗。'
  },
  indications: {
    pt: ['Fortalecimento imunológico', 'Hipertensão arterial', 'Fadiga e cansaço', 'Dores articulares', 'Equilíbrio emocional', 'Melhora da concentração', 'Reabilitação física suave'],
    en: ['Immune strengthening', 'Hypertension', 'Fatigue', 'Joint pain', 'Emotional balance', 'Concentration', 'Rehabilitation'],
    es: ['Fortalecimiento inmunológico', 'Hipertensión', 'Fatiga', 'Dolor articular', 'Equilibrio emocional', 'Concentración', 'Rehabilitación'],
    zh: ['增强免疫力', '高血压', '疲劳', '关节痛', '情绪平衡', '专注力', '康复']
  },
  indicationTags: ['movimento', 'respiração', 'vitalidade', 'longevidade', 'meditação'],
  contraindications: {
    pt: ['Infecções agudas com febre', 'Exaustão física extrema', 'Após refeições pesadas', 'Cirurgias muito recentes', 'Transtornos psiquiátricos descompensados'],
    en: ['Acute infection with fever', 'Extreme exhaustion', 'Full stomach', 'Recent surgery', 'Unstable psychiatric disorders'],
    es: ['Infección aguda con fiebre', 'Agotamiento extremo', 'Estómago lleno', 'Cirugía reciente', 'Trastornos psiquiátricos inestables'],
    zh: ['发烧急性感染', '极度疲劳', '饭后', '近期手术', '不稳定的精神障碍']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?w=500&h=300&fit=crop'
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
    en: 'Gentle manual massage stimulating the lymphatic system to eliminate excess fluids and toxins. Essential for edema reduction and post-surgical recovery.',
    es: 'Masaje manual suave que estimula el sistema linfático para eliminar el exceso de fluidos y toxinas. Esencial para la reducción de edemas y recuperación postquirúrgica.',
    zh: '温和的手法按摩，刺激淋巴系统排出多余液体和毒素。'
  },
  indications: {
    pt: ['Retenção de líquidos', 'Inchaço na gravidez', 'Pós-operatório de cirurgias', 'Celulite', 'Linfedemas', 'Relaxamento do sistema nervoso', 'Desintoxicação'],
    en: ['Fluid retention', 'Pregnancy swelling', 'Post-surgery', 'Cellulite', 'Lymphedema', 'Nervous system relaxation', 'Detox'],
    es: ['Retención de líquidos', 'Hinchazón en el embarazo', 'Postoperatorio', 'Celulitis', 'Linfedema', 'Relajación', 'Desintoxicación'],
    zh: ['体液潴留', '孕期肿胀', '术后', '橘皮组织', '淋巴水肿', '放松', '排毒']
  },
  indicationTags: ['inchaço', 'estetica', 'saude', 'circulação', 'detox'],
  contraindications: {
    pt: ['Tumores malignos não tratados', 'Trombose venosa profunda (TVP)', 'Infecções agudas (bacterianas/virais)', 'Insuficiência cardíaca congestiva', 'Hipertensão não controlada'],
    en: ['Untreated malignant tumors', 'Deep vein thrombosis', 'Acute infections', 'Congestive heart failure', 'Uncontrolled hypertension'],
    es: ['Tumores malignos no tratados', 'Trombosis venosa profunda', 'Infecciones agudas', 'Insuficiencia cardíaca', 'Hipertensión no controlada'],
    zh: ['未治疗的恶性肿瘤', '深静脉血栓', '急性感染', '充血性心力衰竭', '未控制的高血压']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=500&h=300&fit=crop'
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
    en: 'Manual or instrumental technique focused on fascia, the connective tissue surrounding muscles. It aims to release adhesions, improve mobility, and reduce chronic tension pain.',
    es: 'Técnica manual o instrumental enfocada en la fascia, el tejido conectivo que envuelve los músculos. Busca soltar adherencias, mejorar la movilidad y reducir dolores.',
    zh: '专注于筋膜的手法或器械技术，旨在释放粘连，提高活动能力并减轻疼痛。'
  },
  indications: {
    pt: ['Dor muscular crônica', 'Fibromialgia', 'Recuperação pós-treino', 'Melhora da amplitude de movimento', 'Correção postural', 'Cefaleia tensional', 'Fascite plantar'],
    en: ['Chronic muscle pain', 'Fibromyalgia', 'Post-workout recovery', 'Range of motion', 'Posture correction', 'Tension headache', 'Plantar fasciitis'],
    es: ['Dolor muscular crónico', 'Fibromialgia', 'Recuperación post-entreno', 'Amplitud de movimiento', 'Postura', 'Cefalea tensional', 'Fascitis plantar'],
    zh: ['慢性肌肉痛', '纤维肌痛', '训练后恢复', '运动范围', '姿势', '紧张性头痛', '足底筋膜炎']
  },
  indicationTags: ['fáscia', 'massagem', 'dor', 'esporte', 'flexibilidade'],
  contraindications: {
    pt: ['Feridas abertas ou queimaduras', 'Fraturas ou ossos quebrados recentes', 'Uso de anticoagulantes (requer cuidado)', 'Hipresensibilidade cutânea severa', 'Trombose ou flebite'],
    en: ['Open wounds', 'Recent fractures', 'Blood thinners use', 'Severe skin hypersensitivity', 'Thrombosis'],
    es: ['Heridas abiertas', 'Fracturas recientes', 'Anticoagulantes', 'Hipersensibilidad cutánea', 'Trombosis'],
    zh: ['开放性伤口', '近期骨折', '血液稀释剂', '皮肤过敏', '血栓']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&h=300&fit=crop'
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
    en: 'Bioenergetic therapy using subtle and intense touches to redistribute sexual energy throughout the body. Aimed at healing trauma, expanding sensitivity, and self-knowledge, not sexual service.',
    es: 'Terapia bioenergética que utiliza toques para redistribuir la energía sexual. No es un servicio sexual, sino curación de traumas, expansión de la sensibilidad y autoconocimiento.',
    zh: '利用触摸重新分配性能量的生物能量疗法。旨在治愈创伤、扩展敏感度和自我认识。'
  },
  indications: {
    pt: ['Disfunções sexuais (vaginismo, ejaculação precoce)', 'Baixa libido ou anorgasmia', 'Traumas relacionados à sexualidade', 'Desconexão com o próprio corpo', 'Estresse e ansiedade elevados', 'Busca por autoconhecimento sensorial', 'Bloqueios emocionais profundos'],
    en: ['Sexual dysfunctions', 'Low libido', 'Sexual trauma', 'Body disconnection', 'High stress', 'Sensory self-knowledge', 'Deep emotional blocks'],
    es: ['Disfunciones sexuales', 'Baja libido', 'Traumas sexuales', 'Desconexión corporal', 'Estrés elevado', 'Autoconocimiento sensorial', 'Bloqueos emocionales'],
    zh: ['性功能障碍', '性欲低下', '性创伤', '身体脱节', '高压', '感官自我认识', '情绪阻滞']
  },
  indicationTags: ['sexualidade', 'trauma', 'energia', 'corpo', 'sensibilidade'],
  contraindications: {
    pt: ['Histórico de abuso sexual severo (sem acompanhamento psicológico paralelo)', 'Transtornos psiquiátricos graves', 'Feridas ou infecções genitais', 'Gestação de risco (primeiro trimestre)', 'Desconforto extremo com nudez'],
    en: ['Severe sexual abuse history (without therapy)', 'Severe psychiatric disorders', 'Genital infections', 'High-risk pregnancy', 'Extreme discomfort with nudity'],
    es: ['Historial de abuso sexual severo', 'Trastornos psiquiátricos graves', 'Infecciones genitales', 'Embarazo de riesgo', 'Incomodidad extrema con la desnudez'],
    zh: ['严重性虐待史', '严重精神障碍', '生殖器感染', '高危妊娠', '极度不适裸体']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1596131397999-d4190fa72761?w=500&h=300&fit=crop'
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
    en: 'Treatment system focusing on the interrelationship between body structure and function. The osteopath uses hands to diagnose mobility restrictions in joints, tissues, and organs.',
    es: 'Sistema de tratamiento que se enfoca en la interrelación entre estructura y función del cuerpo. El osteópata usa las manos para diagnosticar restricciones de movilidad.',
    zh: '专注于身体结构和功能相互关系的治疗系统。整骨医生用手诊断关节、组织和器官的活动限制。'
  },
  indications: {
    pt: ['Dores na coluna (lombalgia, cervicalgia)', 'Hérnia de disco', 'Ciática', 'Dores de cabeça tensionais', 'Refluxo gastroesofágico (visceral)', 'Lesões esportivas', 'Disfunção da ATM'],
    en: ['Back pain', 'Herniated disc', 'Sciatica', 'Tension headaches', 'Acid reflux', 'Sports injuries', 'TMJ dysfunction'],
    es: ['Dolor de espalda', 'Hernia discal', 'Ciática', 'Cefaleas tensionales', 'Reflujo', 'Lesiones deportivas', 'Disfunción de la ATM'],
    zh: ['背痛', '椎间盘突出', '坐骨神经痛', '紧张性头痛', '反流', '运动损伤', '颞下颌关节功能障碍']
  },
  indicationTags: ['coluna', 'postura', 'dor', 'visceral', 'articulações'],
  contraindications: {
    pt: ['Câncer ósseo ou metástases', 'Infecções ósseas (osteomielite)', 'Fraturas não consolidadas', 'Artrite reumatoide em fase aguda', 'Osteoporose severa (para manipulações fortes)'],
    en: ['Bone cancer', 'Bone infections', 'Unhealed fractures', 'Acute rheumatoid arthritis', 'Severe osteoporosis'],
    es: ['Cáncer óseo', 'Infecciones óseas', 'Fracturas no consolidadas', 'Artritis reumatoide aguda', 'Osteoporosis severa'],
    zh: ['骨癌', '骨感染', '未愈合骨折', '急性类风湿性关节炎', '严重骨质疏松症']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop'
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
    en: 'Profession focused on diagnosing and treating neuromusculoskeletal system issues. Uses manual spinal adjustments to remove nerve interferences.',
    es: 'Profesión enfocada en el diagnóstico y tratamiento del sistema neuromusculoesquelético. Utiliza ajustes manuales en la columna para eliminar interferencias nerviosas.',
    zh: '专注于诊断和治疗神经肌肉骨骼系统问题的职业。使用脊柱调整来消除神经干扰。'
  },
  indications: {
    pt: ['Dor lombar aguda e crônica', 'Torcicolo e dor no pescoço', 'Dores de cabeça e enxaqueca', 'Hérnias de disco', 'Problemas de postura', 'Lesões por esforço repetitivo (LER)', 'Ciática'],
    en: ['Acute/chronic low back pain', 'Neck pain', 'Headaches', 'Herniated discs', 'Posture issues', 'Repetitive strain injuries', 'Sciatica'],
    es: ['Dolor lumbar', 'Dolor de cuello', 'Dolor de cabeza', 'Hernias discales', 'Problemas de postura', 'Lesiones por esfuerzo repetitivo', 'Ciática'],
    zh: ['腰痛', '颈痛', '头痛', '椎间盘突出', '姿势问题', '重复性劳损', '坐骨神经痛']
  },
  indicationTags: ['coluna', 'ajuste', 'ossos', 'postura', 'alívio'],
  contraindications: {
    pt: ['Osteoporose avançada', 'Tumores na coluna', 'Fraturas recentes', 'Instabilidade espinhal grave', 'Infecções ósseas ou articulares'],
    en: ['Advanced osteoporosis', 'Spinal tumors', 'Recent fractures', 'Severe spinal instability', 'Bone infections'],
    es: ['Osteoporosis avanzada', 'Tumores espinales', 'Fracturas recientes', 'Inestabilidad espinal', 'Infecciones óseas'],
    zh: ['晚期骨质疏松症', '脊柱肿瘤', '近期骨折', '严重脊柱不稳定', '骨感染']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1612599720496-a97d95368a5c?w=500&h=300&fit=crop'
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
    en: 'Therapy applying pressure to specific points on feet, hands, or ears corresponding to body organs. Based on the principle that the whole body is mapped on these extremities.',
    es: 'Terapia que aplica presión en puntos específicos de pies o manos que corresponden a órganos. Se basa en que todo el cuerpo está mapeado en estas extremidades.',
    zh: '在对应身体器官的脚、手或耳朵特定点施加压力的疗法。基于全身映射在这些肢体上的原理。'
  },
  indications: {
    pt: ['Estresse e ansiedade', 'Problemas digestivos', 'Desequilíbrios hormonais', 'Insônia', 'Dores de cabeça', 'Cansaço nas pernas e pés', 'Estímulo da circulação sanguínea'],
    en: ['Stress', 'Digestive issues', 'Hormonal imbalances', 'Insomnia', 'Headaches', 'Leg fatigue', 'Blood circulation'],
    es: ['Estrés', 'Problemas digestivos', 'Desequilibrios hormonales', 'Insomnio', 'Dolor de cabeza', 'Cansancio en piernas', 'Circulación'],
    zh: ['压力', '消化问题', '荷尔蒙失调', '失眠', '头痛', '腿部疲劳', '血液循环']
  },
  indicationTags: ['pés', 'mapa', 'relaxamento', 'toque', 'pontos'],
  contraindications: {
    pt: ['Trombose venosa profunda', 'Feridas abertas nos pés', 'Fraturas nos pés ou tornozelos', 'Gravidez (evitar pontos estimulantes de útero)', 'Infecções fúngicas contagiosas'],
    en: ['Deep vein thrombosis', 'Foot wounds', 'Foot fractures', 'Pregnancy (uterus points)', 'Fungal infections'],
    es: ['Trombosis venosa', 'Heridas en pies', 'Fracturas en pies', 'Embarazo (puntos útero)', 'Infecciones fúngicas'],
    zh: ['深静脉血栓', '足部伤口', '足部骨折', '怀孕（子宫穴位）', '真菌感染']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=500&h=300&fit=crop'
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
    en: 'Japanese manual therapy using finger, palm, and elbow pressure on acupuncture points. Seeks to harmonize energy flow (Ki) and correct internal dysfunctions.',
    es: 'Terapia manual japonesa que utiliza la presión de dedos y palmas en puntos de acupuntura. Busca armonizar el flujo de energía (Ki) y corregir disfunciones.',
    zh: '日本手法疗法，使用手指、手掌和肘部按压针灸穴位。旨在协调能量流（Ki）并纠正内部功能障碍。'
  },
  indications: {
    pt: ['Dores musculares e tensão', 'Estresse e fadiga', 'Insônia', 'Problemas respiratórios', 'Dores de cabeça', 'Má digestão', 'Cólicas menstruais'],
    en: ['Muscle pain', 'Stress', 'Insomnia', 'Respiratory issues', 'Headaches', 'Poor digestion', 'Menstrual cramps'],
    es: ['Dolor muscular', 'Estrés', 'Insomnio', 'Problemas respiratorios', 'Dolor de cabeza', 'Mala digestión', 'Cólicos menstruales'],
    zh: ['肌肉痛', '压力', '失眠', '呼吸问题', '头痛', '消化不良', '痛经']
  },
  indicationTags: ['energia', 'japonesa', 'pressão', 'relaxamento', 'meridianos'],
  contraindications: {
    pt: ['Inflamações agudas', 'Febre alta', 'Doenças contagiosas', 'Feridas abertas', 'Osteoporose severa', 'Câncer (requer autorização médica)'],
    en: ['Acute inflammation', 'High fever', 'Contagious diseases', 'Open wounds', 'Severe osteoporosis', 'Cancer'],
    es: ['Inflamación aguda', 'Fiebre alta', 'Enfermedades contagiosas', 'Heridas abiertas', 'Osteoporosis severa', 'Cáncer'],
    zh: ['急性炎症', '高烧', '传染病', '开放性伤口', '严重骨质疏松症', '癌症']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop'
},
{
  id: 'access-consciousness',
  name: { 
    pt: 'Barras de Access', 
    en: 'Access Bars', 
    es: 'Barras de Access', 
    zh: 'Access Bars' 
  },
  category: 'energy',
  description: {
    pt: 'Terapia que consiste no toque suave em 32 pontos na cabeça, onde estão armazenados pensamentos e crenças limitantes. O processo visa "deletar" arquivos mentais inúteis que causam estresse e repetição de padrões. Proporciona uma sensação profunda de relaxamento e clareza mental.',
    en: 'Therapy consisting of gentle touch on 32 points on the head storing limiting thoughts and beliefs. It aims to "delete" useless mental files causing stress.',
    es: 'Terapia que consiste en un toque suave en 32 puntos de la cabeza. El proceso busca "borrar" archivos mentales inútiles que causan estrés y patrones repetitivos.',
    zh: '轻触头部32个点，旨在“删除”导致压力和重复模式的无用心理档案。'
  },
  indications: {
    pt: ['Ansiedade e depressão', 'Mente muito agitada', 'Bloqueios de criatividade', 'Dificuldade de sono', 'Padrões de comportamento repetitivos', 'Estresse acumulado', 'TDAH (suporte complementar)'],
    en: ['Anxiety/Depression', 'Busy mind', 'Creative blocks', 'Sleep issues', 'Repetitive patterns', 'Accumulated stress', 'ADHD support'],
    es: ['Ansiedad/Depresión', 'Mente agitada', 'Bloqueos creativos', 'Problemas de sueño', 'Patrones repetitivos', 'Estrés', 'TDAH'],
    zh: ['焦虑/抑郁', '思维活跃', '创意受阻', '睡眠问题', '重复模式', '累积压力', '多动症支持']
  },
  indicationTags: ['crenças', 'mente', 'desbloqueio', 'energia', 'cabeça'],
  contraindications: {
    pt: ['Não há contraindicações formais conhecidas', 'Pode causar leve desorientação pós-sessão', 'Requer disposição para mudanças internas'],
    en: ['No known formal contraindications', 'May cause slight post-session disorientation', 'Requires willingness for change'],
    es: ['Sin contraindicaciones formales', 'Puede causar desorientación leve', 'Requiere disposición al cambio'],
    zh: ['无已知禁忌', '可能导致轻微的会后迷失方向', '需要改变的意愿']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?w=500&h=300&fit=crop'
},
{
  id: 'alinhamento-energetico',
  name: { 
    pt: 'Alinhamento Energético', 
    en: 'Energy Alignment', 
    es: 'Alineación Energética', 
    zh: '能量调整' 
  },
  category: 'energy',
  description: {
    pt: 'Terapia xamânica brasileira que atua no campo vibracional para dissolver bloqueios emocionais. Utiliza a sensitividade do terapeuta para ler e transmutar energias densas em frequências mais elevadas. O objetivo é alinhar o indivíduo com sua essência divina.',
    en: 'Brazilian shamanic therapy working on the vibrational field to dissolve emotional blocks. Uses therapist sensitivity to read and transmute dense energies.',
    es: 'Terapia chamánica brasileña que actúa en el campo vibracional para disolver bloqueos emocionales. Busca alinear al individuo con su esencia divina.',
    zh: '巴西萨满疗法，作用于振动场以消除情绪阻滞。旨在将个人与其神圣本质对齐。'
  },
  indications: {
    pt: ['Sensação de peso ou bloqueio', 'Conflitos emocionais recorrentes', 'Desequilíbrio dos chakras', 'Falta de propósito', 'Dificuldades nos relacionamentos', 'Limpeza energética', 'Estresse emocional'],
    en: ['Feeling of heaviness', 'Recurring emotional conflicts', 'Chakra imbalance', 'Lack of purpose', 'Relationship difficulties', 'Energy cleansing', 'Emotional stress'],
    es: ['Sensación de pesadez', 'Conflictos emocionales', 'Desequilibrio de chakras', 'Falta de propósito', 'Problemas de relación', 'Limpieza energética', 'Estrés'],
    zh: ['沉重感', '反复的情绪冲突', '脉轮失衡', '缺乏目标', '关系困难', '能量清洁', '压力']
  },
  indicationTags: ['aura', 'chakras', 'cura', 'xamanismo', 'transmutação'],
  contraindications: {
    pt: ['Pessoas sob efeito de álcool ou drogas', 'Surto psicótico ativo', 'Ceticismo extremo (dificulta a conexão)', 'Não substitui tratamento médico', 'Requer abertura emocional'],
    en: ['Under influence of drugs/alcohol', 'Active psychotic episode', 'Extreme skepticism', 'Not a medical substitute', 'Requires emotional openness'],
    es: ['Bajo influencia de drogas/alcohol', 'Brote psicótico', 'Escepticismo extremo', 'No sustituye médico', 'Apertura emocional'],
    zh: ['受药物/酒精影响', '急性精神病发作', '极度怀疑', '不可替代医疗', '情绪开放']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop'
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
    pt: 'Técnica japonesa de imposição de mãos que canaliza a energia vital universal para o paciente. Funciona equilibrando os centros de energia (chakras) e promovendo a capacidade natural do corpo de se curar. É extremamente seguro e relaxante.',
    en: 'Japanese hand-laying technique channeling universal life energy to the patient. Works by balancing energy centers (chakras) and promoting natural healing.',
    es: 'Técnica japonesa de imposición de manos que canaliza la energía vital universal. Equilibra los centros de energía (chakras) y promueve la autocuración.',
    zh: '日本按手礼技术，引导宇宙生命能量给患者。平衡能量中心（脉轮）并促进自然愈合。'
  },
  indications: {
    pt: ['Redução do estresse e ansiedade', 'Alívio da dor física', 'Aceleração da cicatrização', 'Insônia e distúrbios do sono', 'Fadiga crônica', 'Equilíbrio emocional', 'Suporte a tratamentos de câncer'],
    en: ['Stress/Anxiety reduction', 'Pain relief', 'Healing acceleration', 'Insomnia', 'Chronic fatigue', 'Emotional balance', 'Cancer support'],
    es: ['Reducción de estrés', 'Alivio del dolor', 'Cicatrización', 'Insomnio', 'Fatiga crónica', 'Equilibrio emocional', 'Apoyo en cáncer'],
    zh: ['减压', '止痛', '加速愈合', '失眠', '慢性疲劳', '情绪平衡', '癌症支持']
  },
  indicationTags: ['energia', 'mãos', 'cura', 'chakras', 'calma'],
  contraindications: {
    pt: ['Nenhuma contraindicação formal', 'Não substitui medicina alopática', 'Pode ocorrer catarse emocional (choro)', 'Seguro para idosos, crianças e animais', 'Seguro para gestantes'],
    en: ['No formal contraindications', 'Not a medical substitute', 'Emotional catharsis may occur', 'Safe for all ages', 'Safe for pregnancy'],
    es: ['Sin contraindicaciones formales', 'No sustituye medicina', 'Puede haber catarsis emocional', 'Seguro para todos', 'Seguro en embarazo'],
    zh: ['无正式禁忌', '不可替代医疗', '可能发生情绪宣泄', '全年龄安全', '孕期安全']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=500&h=300&fit=crop'
},
{
  id: 'thetahealing',
  name: { 
    pt: 'Thetahealing', 
    en: 'Thetahealing', 
    es: 'Thetahealing', 
    zh: '希塔疗法' 
  },
  category: 'energy',
  description: {
    pt: 'Técnica de meditação e filosofia espiritual que utiliza a onda cerebral Theta para acessar o subconsciente. Permite identificar e alterar instantaneamente crenças limitantes e padrões negativos. É focada na conexão direta com a energia da criação.',
    en: 'Meditation technique using Theta brainwaves to access the subconscious. Allows identifying and instantly changing limiting beliefs and negative patterns.',
    es: 'Técnica de meditación que utiliza la onda cerebral Theta para acceder al subconsciente. Permite identificar y cambiar creencias limitantes y patrones negativos.',
    zh: '使用Theta脑波访问潜意识的冥想技术。允许识别并立即改变限制性信念。'
  },
  indications: {
    pt: ['Ressentimentos e mágoas antigas', 'Medos e fobias', 'Crenças de escassez financeira', 'Padrões de relacionamento tóxicos', 'Baixa autoestima', 'Traumas de infância', 'Manifestação de objetivos'],
    en: ['Resentments', 'Fears/Phobias', 'Scarcity beliefs', 'Toxic relationships', 'Low self-esteem', 'Childhood trauma', 'Goal manifestation'],
    es: ['Resentimientos', 'Miedos', 'Creencias de escasez', 'Relaciones tóxicas', 'Baja autoestima', 'Traumas infantiles', 'Manifestación'],
    zh: ['怨恨', '恐惧', '匮乏信念', '有毒关系', '低自尊', '童年创伤', '目标显化']
  },
  indicationTags: ['crenças', 'subconsciente', 'cura', 'download', 'theta'],
  contraindications: {
    pt: ['Resistência em assumir responsabilidade pessoal', 'Transtornos de personalidade graves (borderline/esquizofrenia)', 'Falta de crença em uma força criadora', 'Expectativa de "milagre" sem ação', 'Uso concomitante de drogas pesadas'],
    en: ['Resistance to responsibility', 'Severe personality disorders', 'Lack of belief in creator', 'Expectation of miracle without action', 'Heavy drug use'],
    es: ['Resistencia a responsabilidad', 'Trastornos graves', 'Falta de creencia', 'Expectativa de milagro', 'Uso de drogas'],
    zh: ['抵制责任', '严重人格障碍', '缺乏信仰', '期待奇迹无行动', '重度吸毒']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1593697820986-13a893c52431?w=500&h=300&fit=crop'
},
{
  id: 'arteterapia',
  name: { 
    pt: 'Arteterapia', 
    en: 'Art Therapy', 
    es: 'Arteterapia', 
    zh: '艺术疗法' 
  },
  category: 'mind',
  description: {
    pt: 'Processo terapêutico que utiliza recursos artísticos (pintura, argila, colagem) para expressar conteúdos internos. Facilita a comunicação de emoções difíceis de verbalizar e promove o autoconhecimento. Não exige habilidades artísticas prévias.',
    en: 'Therapeutic process using artistic resources to express internal contents. Facilitates communication of hard-to-verbalize emotions and promotes self-knowledge.',
    es: 'Proceso terapéutico que utiliza recursos artísticos para expresar contenidos internos. Facilita la comunicación de emociones difíciles de verbalizar.',
    zh: '使用艺术资源表达内在内容的治疗过程。促进难以言喻的情绪交流。'
  },
  indications: {
    pt: ['Dificuldade de expressão verbal', 'Traumas psicológicos', 'Ansiedade e estresse', 'Autoconhecimento e criatividade', 'Luto e perdas', 'Conflitos internos', 'Desenvolvimento cognitivo'],
    en: ['Verbal expression difficulty', 'Trauma', 'Anxiety', 'Self-knowledge', 'Grief', 'Internal conflicts', 'Cognitive development'],
    es: ['Dificultad de expresión', 'Traumas', 'Ansiedad', 'Autoconocimiento', 'Duelo', 'Conflictos internos', 'Desarrollo cognitivo'],
    zh: ['言语表达困难', '创伤', '焦虑', '自我认识', '悲伤', '内心冲突', '认知发展']
  },
  indicationTags: ['arte', 'criatividade', 'expressão', 'psique', 'ludico'],
  contraindications: {
    pt: ['Fases agudas de psicose (pode desorganizar)', 'Resistência extrema a atividades manuais', 'Alergia a materiais específicos (tintas/pó)', 'Falta de espaço adequado (para online)', 'Expectativa de "aula de arte"'],
    en: ['Acute psychosis', 'Resistance to manual activities', 'Material allergies', 'Lack of space', 'Expectation of art class'],
    es: ['Psicosis aguda', 'Resistencia manual', 'Alergias a materiales', 'Falta de espacio', 'Expectativa de clase de arte'],
    zh: ['急性精神病', '抵制手工活动', '材料过敏', '空间不足', '艺术课期望']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&h=300&fit=crop'
},
{
  id: 'constelacao-familiar',
  name: { 
    pt: 'Constelação Familiar', 
    en: 'Family Constellation', 
    es: 'Constelación Familiar', 
    zh: '家庭系统排列' 
  },
  category: 'mind',
  description: {
    pt: 'Abordagem fenomenológica criada por Bert Hellinger que investiga as dinâmicas ocultas nos sistemas familiares. Busca identificar emaranhamentos e lealdades invisíveis que causam sofrimento. O objetivo é restabelecer as "Ordens do Amor" (pertencimento, hierarquia e equilíbrio).',
    en: 'Phenomenological approach investigating hidden dynamics in family systems. Seeks to identify entanglements and invisible loyalties causing suffering.',
    es: 'Enfoque fenomenológico que investiga dinámicas ocultas en sistemas familiares. Busca identificar enredos y lealtades invisibles que causan sufrimiento.',
    zh: '调查家庭系统中隐藏动态的现象学方法。旨在识别导致痛苦的纠缠和不可见忠诚。'
  },
  indications: {
    pt: ['Conflitos familiares recorrentes', 'Dificuldades de relacionamento amoroso', 'Padrões de fracasso financeiro', 'Doenças sem causa médica clara', 'Sentimento de não pertencimento', 'Luto não resolvido', 'Destinos difíceis na família'],
    en: ['Family conflicts', 'Relationship difficulties', 'Financial failure patterns', 'Unexplained illnesses', 'Not belonging feeling', 'Unresolved grief', 'Difficult family fates'],
    es: ['Conflictos familiares', 'Problemas de relación', 'Fracaso financiero', 'Enfermedades inexplicables', 'No pertenencia', 'Duelo no resuelto', 'Destinos difíciles'],
    zh: ['家庭冲突', '关系困难', '财务失败模式', '不明疾病', '归属感缺失', '未解悲伤', '家庭命运']
  },
  indicationTags: ['familia', 'sistema', 'antepassados', 'lealdade', 'amor'],
  contraindications: {
    pt: ['Estados psicóticos ou dissociativos agudos', 'Trauma recente muito intenso', 'Incapacidade de auto-observação', 'Busca por "culpar" os pais', 'Falta de estabilidade emocional pós-sessão'],
    en: ['Psychotic states', 'Recent intense trauma', 'Inability to self-observe', 'Seeking to blame parents', 'Post-session instability'],
    es: ['Estados psicóticos', 'Trauma reciente', 'Incapacidad de autoobservación', 'Culpar a padres', 'Inestabilidad post-sesión'],
    zh: ['精神病状态', '近期严重创伤', '无法自我观察', '责怪父母', '会后不稳定']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=500&h=300&fit=crop'
},
{
  id: 'hipnoterapia',
  name: { 
    pt: 'Hipnoterapia', 
    en: 'Hypnotherapy', 
    es: 'Hipnoterapia', 
    zh: '催眠疗法' 
  },
  category: 'mind',
  description: {
    pt: 'Uso clínico da hipnose para induzir um estado de foco concentrado e relaxamento profundo. Permite acessar o subconsciente para ressignificar memórias, mudar hábitos e tratar traumas. O paciente permanece no controle durante todo o processo.',
    en: 'Clinical use of hypnosis to induce focused attention and deep relaxation. Allows accessing the subconscious to reframe memories, change habits, and treat trauma.',
    es: 'Uso clínico de la hipnosis para inducir atención focalizada y relajación. Permite acceder al subconsciente para resignificar recuerdos y cambiar hábitos.',
    zh: '临床使用催眠诱导集中注意力和深度放松。允许访问潜意识以重构记忆和改变习惯。'
  },
  indications: {
    pt: ['Tratamento de fobias e medos', 'Cessação do tabagismo', 'Perda de peso e compulsão alimentar', 'Controle da dor crônica', 'Ansiedade e síndrome do pânico', 'Melhora da performance esportiva', 'Insônia'],
    en: ['Phobias', 'Smoking cessation', 'Weight loss', 'Pain control', 'Anxiety/Panic', 'Sports performance', 'Insomnia'],
    es: ['Fobias', 'Dejar de fumar', 'Pérdida de peso', 'Control del dolor', 'Ansiedad', 'Rendimiento deportivo', 'Insomnio'],
    zh: ['恐惧症', '戒烟', '减肥', '疼痛控制', '焦虑', '运动表现', '失眠']
  },
  indicationTags: ['transe', 'subconsciente', 'habitos', 'foco', 'memoria'],
  contraindications: {
    pt: ['Esquizofrenia ou transtornos psicóticos', 'Epilepsia (para certas induções)', 'Transtorno Bipolar em fase maníaca', 'Personalidade Borderline grave', 'Uso recente de álcool ou drogas'],
    en: ['Schizophrenia', 'Epilepsy', 'Bipolar (manic phase)', 'Severe Borderline', 'Recent drug/alcohol use'],
    es: ['Esquizofrenia', 'Epilepsia', 'Bipolar (fase maníaca)', 'Borderline grave', 'Uso de drogas/alcohol'],
    zh: ['精神分裂症', '癫痫', '双相（躁狂期）', '严重边缘人格', '近期吸毒/饮酒']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1515023115689-589c33041697?w=500&h=300&fit=crop'
},
{
  id: 'meditacao',
  name: { 
    pt: 'Meditação Guiada', 
    en: 'Guided Meditation', 
    es: 'Meditación Guiada', 
    zh: '引导冥想' 
  },
  category: 'mind',
  description: {
    pt: 'Prática mental conduzida por um instrutor ou gravação que leva ao relaxamento e foco. Utiliza visualizações e instruções de respiração para acalmar a mente e reduzir a atividade do sistema nervoso simpático. Excelente para iniciantes que têm dificuldade em meditar sozinhos.',
    en: 'Mental practice led by an instructor leading to relaxation and focus. Uses visualization and breathing to calm the mind and reduce sympathetic nervous activity.',
    es: 'Práctica mental conducida por un instructor que lleva a la relajación y el enfoque. Usa visualizaciones y respiración para calmar la mente.',
    zh: '由指导员引导的精神练习，导致放松和专注。使用可视化和呼吸使头脑平静。'
  },
  indications: {
    pt: ['Redução do estresse diário', 'Controle da ansiedade', 'Melhora da qualidade do sono', 'Aumento do foco e concentração', 'Desenvolvimento da autocompaixão', 'Regulação da pressão arterial', 'Gestão das emoções'],
    en: ['Stress reduction', 'Anxiety control', 'Sleep quality', 'Focus/Concentration', 'Self-compassion', 'Blood pressure', 'Emotion management'],
    es: ['Reducción de estrés', 'Control de ansiedad', 'Calidad de sueño', 'Enfoque', 'Autocompasión', 'Presión arterial', 'Gestión emocional'],
    zh: ['减压', '焦虑控制', '睡眠质量', '专注', '自我同情', '血压', '情绪管理']
  },
  indicationTags: ['foco', 'calma', 'mente', 'respiração', 'paz'],
  contraindications: {
    pt: ['Nenhuma contraindicação física', 'Pode ser desconfortável para quem tem traumas severos (flashbacks)', 'Requer ambiente silencioso', 'Pode causar tédio inicial', 'Não substitui medicação psiquiátrica'],
    en: ['No physical contraindications', 'Trauma flashbacks risk', 'Requires quiet environment', 'Initial boredom', 'Not a medication substitute'],
    es: ['Sin contraindicaciones físicas', 'Riesgo flashbacks trauma', 'Requiere silencio', 'Aburrimiento inicial', 'No sustituye medicación'],
    zh: ['无身体禁忌', '创伤闪回风险', '需要安静环境', '最初无聊', '不可替代药物']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop'
},
{
  id: 'aromaterapia',
  name: { 
    pt: 'Aromaterapia', 
    en: 'Aromatherapy', 
    es: 'Aromaterapia', 
    zh: '芳香疗法' 
  },
  category: 'nature',
  description: {
    pt: 'Terapia holística que utiliza óleos essenciais extraídos de plantas para promover saúde e bem-estar. As moléculas aromáticas atuam diretamente no sistema límbico do cérebro, responsável pelas emoções. Pode ser aplicada via inalação, massagem ou banhos.',
    en: 'Holistic therapy using essential oils from plants to promote health. Aromatic molecules act directly on the brain\'s limbic system, responsible for emotions.',
    es: 'Terapia holística que utiliza aceites esenciales para promover la salud. Las moléculas aromáticas actúan directamente en el sistema límbico del cerebro.',
    zh: '利用植物精油促进健康的整体疗法。芳香分子直接作用于负责情绪的大脑边缘系统。'
  },
  indications: {
    pt: ['Alterações de humor e estresse', 'Insônia e agitação', 'Problemas respiratórios (eucalipto/hortelã)', 'Dores musculares e inflamação', 'Problemas de pele (lavanda/melaleuca)', 'Estímulo da memória e foco', 'Equilíbrio hormonal (gerânio)'],
    en: ['Mood swings', 'Insomnia', 'Respiratory issues', 'Muscle pain', 'Skin problems', 'Memory/Focus', 'Hormonal balance'],
    es: ['Cambios de humor', 'Insomnio', 'Problemas respiratorios', 'Dolor muscular', 'Problemas de piel', 'Memoria', 'Equilibrio hormonal'],
    zh: ['情绪波动', '失眠', '呼吸问题', '肌肉痛', '皮肤问题', '记忆/专注', '荷尔蒙平衡']
  },
  indicationTags: ['oleos', 'cheiro', 'natureza', 'plantas', 'cerebro'],
  contraindications: {
    pt: ['Alergia a componentes específicos', 'Gravidez (vários óleos são proibidos)', 'Epilepsia (evitar alecrim/cânfora)', 'Exposição ao sol após usar óleos cítricos', 'Uso em bebês sem orientação'],
    en: ['Allergies', 'Pregnancy (restrictions)', 'Epilepsy (avoid rosemary)', 'Sun exposure (citrus oils)', 'Infants without guidance'],
    es: ['Alergias', 'Embarazo (restricciones)', 'Epilepsia (evitar romero)', 'Exposición solar (cítricos)', 'Bebés sin guía'],
    zh: ['过敏', '怀孕（限制）', '癫痫（避开迷迭香）', '阳光暴晒（柑橘油）', '无指导婴儿']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=300&fit=crop'
},
{
  id: 'fitoterapia',
  name: { 
    pt: 'Fitoterapia', 
    en: 'Herbal Medicine', 
    es: 'Fitoterapia', 
    zh: '草药医学' 
  },
  category: 'nature',
  description: {
    pt: 'Uso terapêutico de plantas medicinais e seus derivados para prevenção e tratamento de doenças. Diferente da homeopatia, atua pelo princípio ativo químico da planta. É a base farmacológica de muitos medicamentos modernos, mas usada em sua forma integral.',
    en: 'Therapeutic use of medicinal plants for disease prevention and treatment. Unlike homeopathy, it works via the plant\'s chemical active principle.',
    es: 'Uso terapéutico de plantas medicinales para prevención y tratamiento. A diferencia de la homeopatía, actúa por el principio activo químico de la planta.',
    zh: '利用药用植物预防和治疗疾病。与顺势疗法不同，它通过植物的化学活性成分起作用。'
  },
  indications: {
    pt: ['Distúrbios digestivos e hepáticos', 'Ansiedade leve e insônia', 'Baixa imunidade', 'Inflamações articulares', 'Problemas respiratórios', 'Sintomas da menopausa/TPM', 'Infecções leves'],
    en: ['Digestive disorders', 'Mild anxiety', 'Low immunity', 'Joint inflammation', 'Respiratory issues', 'Menopause/PMS', 'Mild infections'],
    es: ['Trastornos digestivos', 'Ansiedad leve', 'Baja inmunidad', 'Inflamación articular', 'Problemas respiratorios', 'Menopausia/SPM', 'Infecciones leves'],
    zh: ['消化障碍', '轻度焦虑', '低免疫力', '关节炎', '呼吸问题', '更年期/经前综合症', '轻度感染']
  },
  indicationTags: ['chas', 'plantas', 'remedios', 'terra', 'saude'],
  contraindications: {
    pt: ['Interação com medicamentos alopáticos (ex: anticoagulantes)', 'Gravidez e lactação (maioria das plantas)', 'Cirurgias programadas (risco de hemorragia)', 'Insuficiência renal ou hepática', 'Alergias a plantas específicas'],
    en: ['Drug interactions', 'Pregnancy/Lactation', 'Scheduled surgeries', 'Kidney/Liver failure', 'Plant allergies'],
    es: ['Interacción medicamentos', 'Embarazo/Lactancia', 'Cirugías', 'Insuficiencia renal/hepática', 'Alergias plantas'],
    zh: ['药物相互作用', '怀孕/哺乳', '预定手术', '肾/肝衰竭', '植物过敏']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&h=300&fit=crop'
},
{
  id: 'naturopatia',
  name: { 
    pt: 'Naturopatia', 
    en: 'Naturopathy', 
    es: 'Naturopatía', 
    zh: '自然疗法' 
  },
  category: 'nature',
  description: {
    pt: 'Sistema de saúde que enfatiza a capacidade intrínseca do corpo de se curar. Utiliza uma combinação de dietas, exercícios, hidroterapia e mudanças de estilo de vida. O foco é a educação do paciente para a prevenção de doenças.',
    en: 'Health system emphasizing the body\'s intrinsic ability to heal. Uses diet, exercise, hydrotherapy, and lifestyle changes. Focuses on patient education for prevention.',
    es: 'Sistema de salud que enfatiza la capacidad intrínseca del cuerpo para curarse. Usa dieta, ejercicio, hidroterapia y cambios de estilo de vida.',
    zh: '强调身体内在自愈能力的健康系统。使用饮食、运动、水疗和生活方式改变。'
  },
  indications: {
    pt: ['Doenças crônicas relacionadas ao estilo de vida', 'Obesidade e controle de peso', 'Alergias e intolerâncias alimentares', 'Fadiga crônica', 'Desordens digestivas', 'Prevenção de doenças', 'Desintoxicação do organismo'],
    en: ['Lifestyle diseases', 'Obesity', 'Allergies', 'Chronic fatigue', 'Digestive disorders', 'Disease prevention', 'Detox'],
    es: ['Enfermedades de estilo de vida', 'Obesidad', 'Alergias', 'Fatiga crónica', 'Trastornos digestivos', 'Prevención', 'Desintoxicación'],
    zh: ['生活方式疾病', '肥胖', '过敏', '慢性疲劳', '消化障碍', '疾病预防', '排毒']
  },
  indicationTags: ['natural', 'estilo de vida', 'prevenção', 'saude', 'holistico'],
  contraindications: {
    pt: ['Situações de emergência médica (trauma, infarto)', 'Infecções graves agudas', 'Câncer avançado (como tratamento isolado)', 'Necessidade de cirurgia imediata', 'Doenças genéticas graves sem acompanhamento médico'],
    en: ['Medical emergencies', 'Severe acute infections', 'Advanced cancer (as sole treatment)', 'Immediate surgery need', 'Severe genetic diseases'],
    es: ['Emergencias médicas', 'Infecciones graves', 'Cáncer avanzado', 'Cirugía inmediata', 'Enfermedades genéticas'],
    zh: ['医疗紧急情况', '严重急性感染', '晚期癌症', '立即手术需求', '严重遗传病']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?w=500&h=300&fit=crop'
},
{
  id: 'jornada-xamanica',
  name: { 
    pt: 'Jornada Xamânica', 
    en: 'Shamanic Journey', 
    es: 'Viaje Chamánico', 
    zh: '萨满之旅' 
  },
  category: 'shamanic',
  description: {
    pt: 'Prática ancestral que utiliza o ritmo monótono do tambor para induzir um estado alterado de consciência (transe leve). O praticante "viaja" para mundos espirituais para encontrar animais de poder, guias e obter respostas. É uma ferramenta de empoderamento e autoconhecimento profundo.',
    en: 'Ancestral practice using monotonous drumming to induce an altered state of consciousness. The practitioner "travels" to spiritual worlds to find power animals and guides.',
    es: 'Práctica ancestral que utiliza el ritmo del tambor para inducir un estado alterado de conciencia. El practicante "viaja" a mundos espirituales para encontrar guías.',
    zh: '利用单调鼓声诱导意识改变状态的祖先习俗。从业者“旅行”到精神世界寻找力量动物和向导。'
  },
  indications: {
    pt: ['Busca por propósito e direção', 'Resgate de poder pessoal', 'Conexão com a espiritualidade', 'Cura de traumas da alma', 'Obtenção de respostas intuitivas', 'Integração psicológica', 'Sensação de perda ou vazio'],
    en: ['Search for purpose', 'Personal power retrieval', 'Spiritual connection', 'Soul trauma healing', 'Intuitive answers', 'Psychological integration', 'Feeling of emptiness'],
    es: ['Búsqueda de propósito', 'Rescate de poder', 'Conexión espiritual', 'Curación del alma', 'Respuestas intuitivas', 'Integración psicológica', 'Vacío'],
    zh: ['寻找目标', '个人力量恢复', '精神连接', '灵魂创伤愈合', '直觉答案', '心理整合', '空虚感']
  },
  indicationTags: ['tambor', 'transe', 'espirito', 'animais', 'ancestral'],
  contraindications: {
    pt: ['Histórico de epilepsia (devido ao som rítmico)', 'Esquizofrenia ou psicoses', 'Uso recente de substâncias psicoativas', 'Medo intenso do desconhecido', 'Cardiopatias graves (se houver dança intensa)'],
    en: ['Epilepsy history', 'Schizophrenia/Psychosis', 'Psychoactive substance use', 'Intense fear of unknown', 'Severe heart disease'],
    es: ['Historial epilepsia', 'Esquizofrenia', 'Sustancias psicoactivas', 'Miedo intenso', 'Cardiopatías graves'],
    zh: ['癫痫史', '精神分裂症', '精神活性物质使用', '对未知的强烈恐惧', '严重心脏病']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1519810755548-3975387ce847?w=500&h=300&fit=crop'
},
{
  id: 'sound-healing',
  name: { 
    pt: 'Sound Healing', 
    en: 'Sound Healing', 
    es: 'Sanación con Sonido', 
    zh: '声音疗法' 
  },
  category: 'shamanic',
  description: {
    pt: 'Terapia vibracional que utiliza instrumentos como tigelas de cristal, gongos e diapasões. As frequências sonoras penetram no corpo, alterando as ondas cerebrais para estados de relaxamento profundo (Alfa e Theta). Ajuda a harmonizar as células e liberar bloqueios energéticos.',
    en: 'Vibrational therapy using instruments like crystal bowls and gongs. Sound frequencies penetrate the body, altering brainwaves to deep relaxation states.',
    es: 'Terapia vibracional que utiliza cuencos de cristal y gongs. Las frecuencias sonoras penetran en el cuerpo, alterando las ondas cerebrales hacia la relajación.',
    zh: '使用水晶钵和锣等乐器的振动疗法。声频穿透身体，将脑波改变为深度放松状态。'
  },
  indications: {
    pt: ['Estresse e ansiedade severos', 'Bloqueios energéticos e emocionais', 'Dificuldade de meditar', 'Dores crônicas e tensão', 'Insônia e sono agitado', 'Equilíbrio dos chakras', 'Necessidade de relaxamento profundo'],
    en: ['Severe stress/anxiety', 'Energy blocks', 'Meditation difficulty', 'Chronic pain', 'Insomnia', 'Chakra balance', 'Deep relaxation need'],
    es: ['Estrés severo', 'Bloqueos energéticos', 'Dificultad meditación', 'Dolor crónico', 'Insomnio', 'Equilibrio chakras', 'Relajación profunda'],
    zh: ['严重压力', '能量阻滞', '冥想困难', '慢性疼痛', '失眠', '脉轮平衡', '深度放松']
  },
  indicationTags: ['som', 'vibração', 'frequencia', 'relaxamento', 'cristal'],
  contraindications: {
    pt: ['Uso de marcapasso (para gongos e sons fortes)', 'Implantes metálicos grandes (pode vibrar)', 'Epilepsia sônica ou fotossensível', 'Primeiro trimestre de gestação (precaução)', 'Transtornos psiquiátricos sensíveis a som'],
    en: ['Pacemaker use', 'Large metal implants', 'Sonic epilepsy', 'First trimester pregnancy', 'Sound-sensitive disorders'],
    es: ['Marcapasos', 'Implantes metálicos', 'Epilepsia sónica', 'Primer trimestre embarazo', 'Trastornos sensibles al sonido'],
    zh: ['起搏器', '大金属植入物', '声源性癫痫', '怀孕初期', '声敏障碍']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1514533248603-5e82b3d68614?w=500&h=300&fit=crop'
}

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
    pt: 'Técnica de automassagem chinesa baseada nos meridianos, utilizada para promover o fluxo de Qi e prevenir doenças. Envolve percussões, pressões e alongamentos que o próprio praticante realiza. É uma ferramenta poderosa de autonomia em saúde e consciência corporal.',
    en: 'Chinese self-massage technique based on meridians, used to promote Qi flow and prevent disease. Involves percussion, pressure, and stretching performed by the practitioner.',
    es: 'Técnica de automasaje china basada en meridianos, utilizada para promover el flujo de Qi. Implica percusiones, presiones y estiramientos realizados por el propio practicante.',
    zh: '基于经络的中国自我按摩技术，用于促进气流和预防疾病。'
  },
  indications: {
    pt: ['Cansaço e fadiga mental', 'Dores de cabeça leves', 'Ansiedade momentânea', 'Má circulação nas extremidades', 'Rigidez matinal', 'Melhora da digestão', 'Desbloqueio nasal'],
    en: ['Mental fatigue', 'Mild headaches', 'Anxiety', 'Poor circulation', 'Morning stiffness', 'Digestion improvement', 'Nasal unblocking'],
    es: ['Fatiga mental', 'Dolor de cabeza leve', 'Ansiedad', 'Mala circulación', 'Rigidez matutina', 'Digestión', 'Desbloqueo nasal'],
    zh: ['精神疲劳', '轻微头痛', '焦虑', '血液循环不良', '晨僵', '消化改善', '鼻塞']
  },
  indicationTags: ['automassagem', 'energia', 'prevenção', 'meridianos', 'pratico'],
  contraindications: {
    pt: ['Febre alta ou infecções agudas', 'Inflamações locais', 'Logo após refeições pesadas', 'Gravidez (evitar pontos abdominais)', 'Fraturas recentes'],
    en: ['High fever', 'Local inflammation', 'After heavy meals', 'Pregnancy (avoid abdominal points)', 'Recent fractures'],
    es: ['Fiebre alta', 'Inflamación local', 'Después de comer', 'Embarazo (puntos abdominales)', 'Fracturas recientes'],
    zh: ['高烧', '局部炎症', '饭后', '怀孕（避开腹部）', '近期骨折']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop'
},
{
  id: 'feldenkrais',
  name: { 
    pt: 'Método Feldenkrais', 
    en: 'Feldenkrais Method', 
    es: 'Método Feldenkrais', 
    zh: '费尔登克伊斯法' 
  },
  category: 'body',
  description: {
    pt: 'Método de educação somática que utiliza movimentos suaves e conscientes para reorganizar conexões entre cérebro e corpo. O objetivo é substituir padrões de movimento dolorosos ou ineficientes por novas possibilidades neurais. Melhora a autoimagem e a qualidade do movimento.',
    en: 'Somatic education method using gentle, conscious movements to reorganize brain-body connections. Aims to replace painful movement patterns with new neural possibilities.',
    es: 'Método de educación somática que utiliza movimientos suaves para reorganizar conexiones cerebro-cuerpo. Busca reemplazar patrones dolorosos por nuevas posibilidades.',
    zh: '利用温和意识动作重组脑体连接的躯体教育方法。'
  },
  indications: {
    pt: ['Dores crônicas nas costas', 'Rigidez articular', 'Reabilitação neurológica', 'Melhora da performance artística', 'Autoconsciência corporal', 'Alívio de tensão', 'Coordenação motora'],
    en: ['Chronic back pain', 'Joint stiffness', 'Neuro-rehab', 'Artistic performance', 'Body awareness', 'Tension relief', 'Coordination'],
    es: ['Dolor de espalda', 'Rigidez', 'Neuro-rehabilitación', 'Rendimiento artístico', 'Conciencia corporal', 'Alivio tensión', 'Coordinación'],
    zh: ['慢性背痛', '关节僵硬', '神经康复', '艺术表现', '身体意识', '缓解紧张', '协调']
  },
  indicationTags: ['movimento', 'consciencia', 'cerebro', 'educação', 'suave'],
  contraindications: {
    pt: ['Não há contraindicações absolutas (método adaptável)', 'Dor aguda intensa que impeça qualquer movimento', 'Cirurgias muito recentes'],
    en: ['No absolute contraindications', 'Intense acute pain', 'Very recent surgeries'],
    es: ['Sin contraindicaciones absolutas', 'Dolor agudo intenso', 'Cirugías recientes'],
    zh: ['无绝对禁忌', '剧烈急性疼痛', '近期手术']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&h=300&fit=crop'
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
    pt: 'Abordagem que une a fisioterapia tradicional com práticas complementares (como acupuntura e osteopatia) para tratar o paciente como um todo. Não foca apenas na lesão local, mas nos fatores emocionais e sistêmicos associados à dor. Oferece um olhar humanizado e multifatorial.',
    en: 'Approach combining traditional physiotherapy with complementary practices to treat the patient as a whole. Focuses on emotional and systemic factors associated with pain.',
    es: 'Enfoque que une fisioterapia tradicional con prácticas complementarias. No se centra solo en la lesión, sino en factores emocionales y sistémicos.',
    zh: '结合传统物理治疗和补充疗法的方法，整体治疗患者。'
  },
  indications: {
    pt: ['Reabilitação de lesões complexas', 'Dores crônicas persistentes', 'Doenças psicossomáticas', 'Prevenção de lesões', 'Pós-operatório humanizado', 'Desequilíbrios posturais', 'Fibromialgia'],
    en: ['Complex injury rehab', 'Persistent chronic pain', 'Psychosomatic diseases', 'Injury prevention', 'Post-surgery', 'Postural imbalances', 'Fibromyalgia'],
    es: ['Rehabilitación compleja', 'Dolor crónico', 'Enfermedades psicosomáticas', 'Prevención', 'Postoperatorio', 'Desequilibrios posturales', 'Fibromialgia'],
    zh: ['复杂损伤康复', '持续慢性疼痛', '身心疾病', '预防', '术后', '姿势失衡', '纤维肌痛']
  },
  indicationTags: ['reabilitação', 'holistico', 'integrativo', 'movimento', 'saude'],
  contraindications: {
    pt: ['Mesmas da fisioterapia convencional (fraturas instáveis, infecções)', 'Uso de técnicas manuais em áreas tumorais', 'Febre'],
    en: ['Unstable fractures', 'Infections', 'Manual techniques on tumor areas', 'Fever'],
    es: ['Fracturas inestables', 'Infecciones', 'Técnicas manuales en tumores', 'Fiebre'],
    zh: ['不稳定骨折', '感染', '肿瘤区域手法', '发烧']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=300&fit=crop'
},
{
  id: 'massagem-ayurvedica',
  name: { 
    pt: 'Massagem Ayurvédica', 
    en: 'Ayurvedic Massage (Abhyanga)', 
    es: 'Masaje Ayurvédico', 
    zh: '阿育吠陀按摩' 
  },
  category: 'body',
  description: {
    pt: 'Conhecida como Abhyanga, utiliza óleos mornos medicados específicos para o Dosha (tipo biológico) do paciente. As manobras são rítmicas e vigorosas, visando nutrir os tecidos e remover toxinas (Ama). Harmoniza profundamente o sistema nervoso.',
    en: 'Known as Abhyanga, uses warm medicated oils specific to the patient\'s Dosha. Rhythmic and vigorous maneuvers aim to nourish tissues and remove toxins.',
    es: 'Conocida como Abhyanga, utiliza aceites tibios medicados específicos para el Dosha. Maniobras rítmicas y vigorosas para nutrir tejidos y eliminar toxinas.',
    zh: '被称为Abhyanga，使用针对患者体质的温热药油。有节奏和有力的手法旨在滋养组织并排出毒素。'
  },
  indications: {
    pt: ['Ressecamento da pele (Vata)', 'Fadiga muscular', 'Ansiedade e insônia', 'Desintoxicação linfática', 'Rigidez articular', 'Rejuvenescimento', 'Equilíbrio energético'],
    en: ['Dry skin', 'Muscle fatigue', 'Anxiety/Insomnia', 'Lymphatic detox', 'Joint stiffness', 'Rejuvenation', 'Energy balance'],
    es: ['Piel seca', 'Fatiga muscular', 'Ansiedad/Insomnio', 'Desintoxicación', 'Rigidez articular', 'Rejuvenecimiento', 'Equilibrio'],
    zh: ['皮肤干燥', '肌肉疲劳', '焦虑/失眠', '淋巴排毒', '关节僵硬', '回春', '能量平衡']
  },
  indicationTags: ['oleo', 'indiana', 'detox', 'relaxamento', 'dosha'],
  contraindications: {
    pt: ['Indigestão aguda', 'Febre ou gripe', 'Menstruação (fluxo intenso)', 'Infecções de pele', 'Gravidez (primeiros 3 meses)'],
    en: ['Acute indigestion', 'Fever/Flu', 'Menstruation', 'Skin infections', 'Pregnancy (first 3 months)'],
    es: ['Indigestión', 'Fiebre/Gripe', 'Menstruación', 'Infecciones piel', 'Embarazo (primeros meses)'],
    zh: ['消化不良', '发烧/流感', '月经', '皮肤感染', '怀孕（初期）']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&h=300&fit=crop'
},
{
  id: 'massagem-relaxante',
  name: { 
    pt: 'Massagem Relaxante', 
    en: 'Relaxing Massage', 
    es: 'Masaje Relajante', 
    zh: '放松按摩' 
  },
  category: 'body',
  description: {
    pt: 'Técnica clássica que utiliza movimentos suaves, deslizamentos e amassamentos para aliviar a tensão muscular e o estresse mental. Foca no bem-estar geral, aumento da circulação sanguínea e produção de hormônios de relaxamento como a serotonina.',
    en: 'Classic technique using gentle movements, gliding, and kneading to relieve muscle tension and mental stress. Focuses on general well-being and circulation.',
    es: 'Técnica clásica que utiliza movimientos suaves para aliviar la tensión muscular y el estrés. Se enfoca en el bienestar general y la circulación.',
    zh: '经典技术，使用温和动作、滑动和揉捏来缓解肌肉紧张和精神压力。'
  },
  indications: {
    pt: ['Estresse do dia a dia', 'Tensões musculares leves', 'Ansiedade', 'Insônia', 'Cansaço físico', 'Melhora da circulação', 'Autocuidado'],
    en: ['Daily stress', 'Mild muscle tension', 'Anxiety', 'Insomnia', 'Physical tiredness', 'Circulation', 'Self-care'],
    es: ['Estrés diario', 'Tensiones leves', 'Ansiedad', 'Insomnio', 'Cansancio', 'Circulación', 'Autocuidado'],
    zh: ['日常压力', '轻微肌肉紧张', '焦虑', '失眠', '身体疲劳', '循环', '自我护理']
  },
  indicationTags: ['relaxamento', 'bem-estar', 'calma', 'toque', 'classica'],
  contraindications: {
    pt: ['Febre', 'Doenças contagiosas', 'Trombose', 'Feridas abertas', 'Fraturas recentes'],
    en: ['Fever', 'Contagious diseases', 'Thrombosis', 'Open wounds', 'Recent fractures'],
    es: ['Fiebre', 'Enfermedades contagiosas', 'Trombosis', 'Heridas abiertas', 'Fracturas recientes'],
    zh: ['发烧', '传染病', '血栓', '开放性伤口', '近期骨折']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=500&h=300&fit=crop'
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
    pt: 'Método de condicionamento físico que integra corpo e mente, focado no fortalecimento do "Power House" (centro de força abdominal). Melhora a postura, flexibilidade e controle respiratório. Pode ser praticado no solo (Mat) ou em aparelhos específicos.',
    en: 'Physical conditioning method integrating body and mind, focused on strengthening the "Power House" (core). Improves posture, flexibility, and breathing control.',
    es: 'Método de acondicionamiento físico que integra cuerpo y mente, enfocado en fortalecer el centro abdominal. Mejora postura, flexibilidad y respiración.',
    zh: '结合身心的身体调节方法，专注于强化核心肌群。改善姿势、灵活性和呼吸控制。'
  },
  indications: {
    pt: ['Fortalecimento do core', 'Reabilitação de coluna', 'Melhora da postura', 'Flexibilidade', 'Prevenção de lesões', 'Tonificação muscular', 'Equilíbrio'],
    en: ['Core strengthening', 'Spine rehab', 'Posture improvement', 'Flexibility', 'Injury prevention', 'Toning', 'Balance'],
    es: ['Fortalecimiento core', 'Rehabilitación columna', 'Postura', 'Flexibilidad', 'Prevención lesiones', 'Tonificación', 'Equilibrio'],
    zh: ['核心强化', '脊柱康复', '姿势改善', '灵活性', '预防损伤', '肌肉塑形', '平衡']
  },
  indicationTags: ['força', 'flexibilidade', 'postura', 'core', 'movimento'],
  contraindications: {
    pt: ['Gestação de alto risco', 'Hérnia de disco em crise aguda', 'Pós-operatório imediato sem liberação', 'Labirintite não controlada', 'Doenças cardiovasculares instáveis'],
    en: ['High-risk pregnancy', 'Acute herniated disc', 'Immediate post-op', 'Uncontrolled labyrinthitis', 'Unstable cardiovascular disease'],
    es: ['Embarazo alto riesgo', 'Hernia aguda', 'Postoperatorio inmediato', 'Laberintitis', 'Cardiovasculares inestables'],
    zh: ['高危妊娠', '急性椎间盘突出', '术后立即', '未控制的迷路炎', '不稳定心血管病']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&h=300&fit=crop'
},
{
  id: 'rolfing',
  name: { 
    pt: 'Rolfing', 
    en: 'Rolfing', 
    es: 'Rolfing', 
    zh: '罗尔芬疗法' 
  },
  category: 'body',
  description: {
    pt: 'Método de Integração Estrutural que manipula profundamente a fáscia para realinhar o corpo com a gravidade. O processo geralmente ocorre em uma série de 10 sessões, reorganizando segmentos corporais. O resultado é uma postura mais ereta e movimentos mais fluidos.',
    en: 'Structural Integration method manipulating fascia to realign the body with gravity. Usually a 10-session series reorganizing body segments.',
    es: 'Método de Integración Estructural que manipula la fascia para realinear el cuerpo con la gravedad. Generalmente una serie de 10 sesiones.',
    zh: '结构整合方法，操纵筋膜使身体与重力重新对齐。通常为10次疗程。'
  },
  indications: {
    pt: ['Desvios posturais crônicos', 'Dores miofasciais', 'Sensação de corpo "pesado"', 'Rigidez de movimento', 'Melhora da respiração', 'Autoconhecimento corporal', 'Performance atlética'],
    en: ['Chronic postural deviations', 'Myofascial pain', 'Heavy body feeling', 'Movement stiffness', 'Breathing improvement', 'Body self-knowledge', 'Athletic performance'],
    es: ['Desviaciones posturales', 'Dolor miofascial', 'Cuerpo pesado', 'Rigidez', 'Respiración', 'Autoconocimiento', 'Rendimiento'],
    zh: ['慢性姿势偏差', '肌筋膜痛', '身体沉重感', '运动僵硬', '呼吸改善', '身体自我认识', '运动表现']
  },
  indicationTags: ['estrutura', 'fáscia', 'postura', 'gravidade', 'alinhamento'],
  contraindications: {
    pt: ['Doenças inflamatórias agudas (artrite)', 'Infecções', 'Câncer em atividade', 'Osteoporose severa', 'Uso prolongado de corticoides'],
    en: ['Acute inflammatory diseases', 'Infections', 'Active cancer', 'Severe osteoporosis', 'Prolonged steroid use'],
    es: ['Inflamaciones agudas', 'Infecciones', 'Cáncer activo', 'Osteoporosis severa', 'Corticoides'],
    zh: ['急性炎症', '感染', '活动性癌症', '严重骨质疏松症', '长期类固醇使用']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1579126038374-6064e9370f0f?w=500&h=300&fit=crop'
},
{
  id: 'tai-chi-chuan',
  name: { 
    pt: 'Tai Chi Chuan', 
    en: 'Tai Chi', 
    es: 'Tai Chi', 
    zh: '太极拳' 
  },
  category: 'body',
  description: {
    pt: 'Arte marcial interna chinesa conhecida como "meditação em movimento". Envolve sequências de movimentos lentos, circulares e contínuos que promovem o fluxo de Qi. Excelente para equilíbrio físico e mental, especialmente em idosos.',
    en: 'Chinese internal martial art known as "moving meditation". Involves slow, circular, continuous movements promoting Qi flow.',
    es: 'Arte marcial interna china conocida como "meditación en movimiento". Implica movimientos lentos y circulares que promueven el flujo de Qi.',
    zh: '被称为“移动冥想”的中国内家拳。涉及促进气流的缓慢、循环、连续动作。'
  },
  indications: {
    pt: ['Prevenção de quedas (equilíbrio)', 'Redução do estresse', 'Hipertensão', 'Artrite e dores articulares', 'Foco e memória', 'Flexibilidade suave', 'Fortalecimento das pernas'],
    en: ['Fall prevention', 'Stress reduction', 'Hypertension', 'Arthritis', 'Focus/Memory', 'Gentle flexibility', 'Leg strengthening'],
    es: ['Prevención caídas', 'Reducción estrés', 'Hipertensión', 'Artritis', 'Enfoque/Memoria', 'Flexibilidad', 'Fortalecimiento piernas'],
    zh: ['预防跌倒', '减压', '高血压', '关节炎', '专注/记忆', '柔韧性', '腿部强化']
  },
  indicationTags: ['equilibrio', 'marcial', 'suave', 'idosos', 'mente'],
  contraindications: {
    pt: ['Nenhuma contraindicação absoluta (adaptável)', 'Cuidado em lesões agudas de joelho', 'Cansaço extremo'],
    en: ['No absolute contraindications', 'Acute knee injuries caution', 'Extreme tiredness'],
    es: ['Sin contraindicaciones absolutas', 'Cuidado lesiones rodilla', 'Cansancio extremo'],
    zh: ['无绝对禁忌', '急性膝盖损伤注意', '极度疲劳']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?w=500&h=300&fit=crop'
},
{
  id: 'terapia-craniossacral',
  name: { 
    pt: 'Terapia Craniossacral', 
    en: 'Craniosacral Therapy', 
    es: 'Terapia Craneosacral', 
    zh: '颅骶疗法' 
  },
  category: 'body',
  description: {
    pt: 'Terapia manual de toque extremamente leve que avalia e trata o sistema craniossacral (membranas e fluido que envolvem cérebro e medula). Busca liberar restrições profundas e melhorar o funcionamento do sistema nervoso central. Induz um relaxamento profundo.',
    en: 'Extremely light touch manual therapy evaluating the craniosacral system. Seeks to release deep restrictions and improve CNS function.',
    es: 'Terapia manual de toque muy ligero que evalúa el sistema craneosacral. Busca liberar restricciones profundas y mejorar el sistema nervioso central.',
    zh: '极轻触摸的手法疗法，评估颅骶系统。旨在释放深度限制并改善中枢神经系统功能。'
  },
  indications: {
    pt: ['Enxaquecas e dores de cabeça', 'Dores crônicas no pescoço', 'Estresse e fadiga crônica', 'Bruxismo e ATM', 'Fibromialgia', 'Traumas pós-parto (bebês)', 'Autismo (suporte)'],
    en: ['Migraines', 'Chronic neck pain', 'Stress/Chronic fatigue', 'TMJ/Bruxism', 'Fibromyalgia', 'Post-birth trauma', 'Autism support'],
    es: ['Migrañas', 'Dolor cuello', 'Estrés', 'Bruxismo', 'Fibromialgia', 'Trauma postparto', 'Apoyo autismo'],
    zh: ['偏头痛', '慢性颈痛', '压力/慢性疲劳', '颞下颌关节/磨牙', '纤维肌痛', '产后创伤', '自闭症支持']
  },
  indicationTags: ['cabeça', 'sutil', 'sistema-nervoso', 'relaxamento', 'toque'],
  contraindications: {
    pt: ['Aneurisma cerebral', 'Hemorragia intracraniana recente', 'Fratura craniana recente', 'Hérnia de bulbo', 'Qualquer condição onde a variação de pressão intracraniana seja risco'],
    en: ['Cerebral aneurysm', 'Recent intracranial hemorrhage', 'Skull fracture', 'Herniation', 'Intracranial pressure risks'],
    es: ['Aneurisma', 'Hemorragia reciente', 'Fractura cráneo', 'Hernia bulbo', 'Riesgos presión intracraneal'],
    zh: ['脑动脉瘤', '近期颅内出血', '颅骨骨折', '脑疝', '颅内压风险']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1632345031635-c35da26b23a9?w=500&h=300&fit=crop'
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
    pt: 'Técnica que utiliza copos de vidro ou acrílico para criar sucção na pele (vácuo). Isso aumenta massivamente a circulação sanguínea local, solta a fáscia e drena toxinas estagnadas. Deixa marcas circulares temporárias que indicam o estado da estagnação.',
    en: 'Technique using cups to create suction on the skin. Massively increases local blood circulation, releases fascia, and drains toxins. Leaves temporary circular marks.',
    es: 'Técnica que utiliza copas para crear succión en la piel. Aumenta la circulación, suelta la fascia y drena toxinas. Deja marcas temporales.',
    zh: '使用杯子在皮肤上产生吸力的技术。大幅增加局部血液循环，释放筋膜并排出毒素。'
  },
  indications: {
    pt: ['Dor nas costas e ombros', 'Contraturas musculares', 'Recuperação esportiva', 'Inflamação local', 'Resfriados e gripes (pulmão)', 'Celulite', 'Melhora da circulação'],
    en: ['Back/Shoulder pain', 'Muscle knots', 'Sports recovery', 'Inflammation', 'Colds/Flu', 'Cellulite', 'Circulation'],
    es: ['Dolor espalda', 'Contracturas', 'Recuperación deportiva', 'Inflamación', 'Resfriados', 'Celulitis', 'Circulación'],
    zh: ['背/肩痛', '肌肉结', '运动恢复', '炎症', '感冒/流感', '橘皮组织', '循环']
  },
  indicationTags: ['sucção', 'dor', 'musculos', 'sangue', 'chinesa'],
  contraindications: {
    pt: ['Pele ferida ou ulcerada', 'Distúrbios hemorrágicos (hemofilia)', 'Varizes expostas no local', 'Febre alta', 'Pacientes muito debilitados/anêmicos'],
    en: ['Wounded skin', 'Bleeding disorders', 'Varicose veins', 'High fever', 'Debilitated/Anemic patients'],
    es: ['Piel herida', 'Trastornos hemorrágicos', 'Varices', 'Fiebre alta', 'Pacientes debilitados'],
    zh: ['皮肤受伤', '出血性疾病', '静脉曲张', '高烧', '虚弱/贫血患者']
  },
  modality: 'presencial',
  image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&h=300&fit=crop'
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
    pt: 'Sistema milenar indiano que une corpo, mente e espírito através de Asanas (posturas), Pranayamas (respiração) e Meditação. Existem diversos estilos, do mais vigoroso (Ashtanga) ao mais restaurativo. Promove autoconhecimento e saúde integral.',
    en: 'Ancient Indian system uniting body, mind, and spirit through Asanas, Pranayamas, and Meditation. Promotes self-knowledge and integral health.',
    es: 'Sistema milenario indio que une cuerpo, mente y espíritu a través de posturas, respiración y meditación. Promueve autoconocimiento y salud integral.',
    zh: '结合身心灵的古老印度系统，通过体式、调息和冥想。'
  },
  indications: {
    pt: ['Ansiedade e estresse', 'Falta de flexibilidade', 'Fortalecimento muscular', 'Dores nas costas', 'Equilíbrio emocional', 'Problemas respiratórios', 'Conexão espiritual'],
    en: ['Anxiety/Stress', 'Inflexibility', 'Strengthening', 'Back pain', 'Emotional balance', 'Respiratory issues', 'Spiritual connection'],
    es: ['Ansiedad/Estrés', 'Falta flexibilidad', 'Fortalecimiento', 'Dolor espalda', 'Equilibrio emocional', 'Problemas respiratorios', 'Conexión espiritual'],
    zh: ['焦虑/压力', '缺乏柔韧性', '强化', '背痛', '情绪平衡', '呼吸问题', '精神连接']
  },
  indicationTags: ['flexibilidade', 'respiração', 'mente', 'espiritual', 'postura'],
  contraindications: {
    pt: ['Lesões agudas não tratadas', 'Glaucoma (para posturas invertidas)', 'Hipertensão não controlada', 'Gravidez (requer adaptação)', 'Hérnia de disco (evitar certas flexões)'],
    en: ['Untreated acute injuries', 'Glaucoma (inversions)', 'Uncontrolled hypertension', 'Pregnancy (adaptations needed)', 'Herniated disc'],
    es: ['Lesiones agudas', 'Glaucoma', 'Hipertensión', 'Embarazo (adaptación)', 'Hernia discal'],
    zh: ['未治疗急性损伤', '青光眼（倒立）', '未控制高血压', '怀孕（需适应）', '椎间盘突出']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=500&h=300&fit=crop'
},
{
  id: 'apometria',
  name: { 
    pt: 'Apometria', 
    en: 'Apometry', 
    es: 'Apometría', 
    zh: '阿波罗疗法' 
  },
  category: 'energy',
  description: {
    pt: 'Técnica terapêutica que utiliza o desdobramento induzido dos corpos sutis através de pulsos magnéticos mentais. Visa tratar desequilíbrios espirituais, obsessões e traumas de vidas passadas. Realizada geralmente em grupo, mas aplicável individualmente.',
    en: 'Therapeutic technique using induced unfolding of subtle bodies via mental magnetic pulses. Treats spiritual imbalances, obsessions, and past life traumas.',
    es: 'Técnica terapéutica que utiliza el desdoblamiento inducido de cuerpos sutiles. Trata desequilibrios espirituales, obsesiones y traumas de vidas pasadas.',
    zh: '利用精神磁脉冲诱导微妙身体展开的治疗技术。治疗精神失衡、困扰和前世创伤。'
  },
  indications: {
    pt: ['Transtornos espirituais e obsessivos', 'Traumas profundos inexplicáveis', 'Limpeza de magia ou energias densas', 'Síndrome do pânico (origem espiritual)', 'Desequilíbrios de personalidade', 'Cortes de vínculos nocivos', 'Harmonização de ambientes'],
    en: ['Spiritual disorders', 'Deep unexplained trauma', 'Energy cleansing', 'Panic syndrome', 'Personality imbalances', 'Cutting harmful bonds', 'Environment harmonization'],
    es: ['Trastornos espirituales', 'Traumas profundos', 'Limpieza energética', 'Pánico', 'Desequilibrios personalidad', 'Corte vínculos', 'Armonización'],
    zh: ['精神障碍', '无法解释的深度创伤', '能量清洁', '恐慌综合症', '人格失衡', '切断有害联系', '环境协调']
  },
  indicationTags: ['espiritual', 'desdobramento', 'limpeza', 'obsessão', 'mediunidade'],
  contraindications: {
    pt: ['Pessoas com esquizofrenia não medicada', 'Uso recente de drogas ou álcool', 'Cardiopatas graves (emoções fortes)', 'Gestantes (precaução)', 'Ceticismo hostil'],
    en: ['Unmedicated schizophrenia', 'Recent drug/alcohol use', 'Severe heart disease', 'Pregnancy (caution)', 'Hostile skepticism'],
    es: ['Esquizofrenia no medicada', 'Drogas/alcohol', 'Cardiopatías', 'Embarazo', 'Escepticismo hostil'],
    zh: ['未服药精神分裂症', '近期毒品/酒精', '严重心脏病', '怀孕', '敌对怀疑']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop'
},
{
  id: 'cromoterapia',
  name: { 
    pt: 'Cromoterapia', 
    en: 'Chromotherapy', 
    es: 'Cromoterapia', 
    zh: '色彩疗法' 
  },
  category: 'energy',
  description: {
    pt: 'Ciência que utiliza as cores do espectro solar para restaurar o equilíbrio físico e energético. Cada cor possui uma frequência vibratória específica que atua em órgãos e chakras. Pode ser aplicada com lâmpadas, água solarizada ou visualização.',
    en: 'Science using solar spectrum colors to restore physical and energy balance. Each color has a specific frequency acting on organs and chakras.',
    es: 'Ciencia que utiliza los colores del espectro solar para restaurar el equilibrio. Cada color tiene una frecuencia específica que actúa en órganos y chakras.',
    zh: '利用太阳光谱颜色恢复身体和能量平衡的科学。每种颜色都有特定的频率作用于器官和脉轮。'
  },
  indications: {
    pt: ['Depressão (Laranja/Amarelo)', 'Ansiedade e estresse (Azul/Verde)', 'Inflamações (Azul)', 'Cicatrização (Verde)', 'Falta de energia (Vermelho)', 'Insônia (Índigo)', 'Equilíbrio dos chakras'],
    en: ['Depression', 'Anxiety', 'Inflammation', 'Healing', 'Lack of energy', 'Insomnia', 'Chakra balance'],
    es: ['Depresión', 'Ansiedad', 'Inflamación', 'Cicatrización', 'Falta energía', 'Insomnio', 'Chakras'],
    zh: ['抑郁', '焦虑', '炎症', '愈合', '缺乏能量', '失眠', '脉轮']
  },
  indicationTags: ['cores', 'luz', 'frequencia', 'chakras', 'suave'],
  contraindications: {
    pt: ['Epilepsia fotossensível (luzes piscantes)', 'Uso excessivo de cores estimulantes (vermelho) em hipertensos', 'Cores depressoras em quadros depressivos'],
    en: ['Photosensitive epilepsy', 'Excessive stimulating colors in hypertension', 'Depressant colors in depression'],
    es: ['Epilepsia fotosensible', 'Colores estimulantes en hipertensión', 'Colores depresores en depresión'],
    zh: ['光敏性癫痫', '高血压患者过度使用刺激色', '抑郁症患者使用抑制色']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1520121401995-928cd50d4e27?w=500&h=300&fit=crop'
},
{
  id: 'cristaloterapia',
  name: { 
    pt: 'Cristaloterapia', 
    en: 'Crystal Healing', 
    es: 'Cristaloterapia', 
    zh: '水晶疗法' 
  },
  category: 'energy',
  description: {
    pt: 'Uso terapêutico de cristais e pedras preciosas dispostos sobre o corpo. A estrutura cristalina das pedras ressoa com os centros energéticos humanos, promovendo alinhamento e cura. Cada cristal possui propriedades específicas (ex: Ametista para transmutação).',
    en: 'Therapeutic use of crystals and gemstones placed on the body. Crystal structure resonates with human energy centers, promoting alignment and healing.',
    es: 'Uso terapéutico de cristales y piedras preciosas sobre el cuerpo. La estructura cristalina resuena con los centros energéticos, promoviendo la curación.',
    zh: '将水晶和宝石放置在身体上的治疗用途。晶体结构与人类能量中心共鸣，促进对齐和愈合。'
  },
  indications: {
    pt: ['Proteção energética', 'Alinhamento dos chakras', 'Clareza mental', 'Equilíbrio emocional', 'Aumento da intuição', 'Redução do estresse', 'Ambientes carregados'],
    en: ['Energy protection', 'Chakra alignment', 'Mental clarity', 'Emotional balance', 'Intuition', 'Stress reduction', 'Heavy environments'],
    es: ['Protección energética', 'Alineación chakras', 'Claridad mental', 'Equilibrio emocional', 'Intuición', 'Estrés', 'Ambientes cargados'],
    zh: ['能量保护', '脉轮对齐', '头脑清晰', '情绪平衡', '直觉', '减压', '沉重环境']
  },
  indicationTags: ['pedras', 'terra', 'vibração', 'quartzo', 'minerais'],
  contraindications: {
    pt: ['Não há contraindicações físicas', 'Cuidado com pedras tóxicas se usadas em elixires (água)', 'Uso de pedras não limpas energeticamente'],
    en: ['No physical contraindications', 'Toxic stones in elixirs', 'Uncleansed stones'],
    es: ['Sin contraindicaciones físicas', 'Piedras tóxicas en elixires', 'Piedras no limpias'],
    zh: ['无身体禁忌', '药剂中的有毒石头', '未清洁的石头']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&h=300&fit=crop'
},
{
  id: 'cura-pranica',
  name: { 
    pt: 'Cura Prânica', 
    en: 'Pranic Healing', 
    es: 'Sanación Pránica', 
    zh: '般尼克疗法' 
  },
  category: 'energy',
  description: {
    pt: 'Sistema desenvolvido por Master Choa Kok Sui que utiliza o prana (energia vital) para curar doenças. Não há toque físico; o terapeuta limpa a energia doente e projeta energia nova. É uma técnica muito sistemática e precisa.',
    en: 'System developed by Master Choa Kok Sui using prana (vital energy) to heal ailments. No physical touch; cleanses diseased energy and projects new energy.',
    es: 'Sistema que utiliza el prana para curar dolencias. Sin contacto físico; limpia la energía enferma y proyecta energía nueva.',
    zh: '利用普拉那（生命能量）治疗疾病的系统。无身体接触；清洁病态能量并投射新能量。'
  },
  indications: {
    pt: ['Doenças físicas agudas e crônicas', 'Problemas psicológicos', 'Vícios (cigarro/álcool)', 'Estresse e hipertensão', 'Fortalecimento imunológico', 'Traumas', 'Relacionamentos'],
    en: ['Physical diseases', 'Psychological issues', 'Addictions', 'Stress/Hypertension', 'Immunity', 'Trauma', 'Relationships'],
    es: ['Enfermedades físicas', 'Problemas psicológicos', 'Adicciones', 'Estrés', 'Inmunidad', 'Traumas', 'Relaciones'],
    zh: ['身体疾病', '心理问题', '成瘾', '压力/高血压', '免疫力', '创伤', '关系']
  },
  indicationTags: ['prana', 'energia', 'limpeza', 'sem-toque', 'sistematico'],
  contraindications: {
    pt: ['Nenhuma contraindicação formal', 'Não deve interromper tratamento médico convencional', 'Requer receptividade do paciente'],
    en: ['No formal contraindications', 'Do not stop medical treatment', 'Requires receptivity'],
    es: ['Sin contraindicaciones formales', 'No interrumpir médico', 'Requiere receptividad'],
    zh: ['无正式禁忌', '不停止医疗', '需要接受度']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=500&h=300&fit=crop'
},
{
  id: 'eft',
  name: { 
    pt: 'EFT (Tapping)', 
    en: 'EFT (Tapping)', 
    es: 'EFT (Tapping)', 
    zh: '情绪释放技术' 
  },
  category: 'energy',
  description: {
    pt: 'Técnica de Libertação Emocional que combina acupressão (batidas leves com os dedos) em pontos de meridianos com afirmações verbais. É excelente para "dissolver" a carga emocional de memórias traumáticas e crenças negativas.',
    en: 'Emotional Freedom Technique combining acupressure (tapping) on meridian points with verbal affirmations. Dissolves emotional charge of traumas.',
    es: 'Técnica de Liberación Emocional que combina acupresión (golpecitos) con afirmaciones. Disuelve la carga emocional de traumas.',
    zh: '结合指压（轻拍）经络点和口头肯定的情绪释放技术。消除创伤的情绪负荷。'
  },
  indications: {
    pt: ['Fobias específicas (avião, animais)', 'Ansiedade e pânico', 'Estresse pós-traumático', 'Dores físicas somáticas', 'Crenças limitantes', 'Perda de peso (fome emocional)', 'Raiva e culpa'],
    en: ['Phobias', 'Anxiety/Panic', 'PTSD', 'Somatic pain', 'Limiting beliefs', 'Weight loss', 'Anger/Guilt'],
    es: ['Fobias', 'Ansiedad', 'TEPT', 'Dolor somático', 'Creencias limitantes', 'Pérdida peso', 'Ira/Culpa'],
    zh: ['恐惧症', '焦虑/恐慌', '创伤后应激障碍', '躯体疼痛', '限制性信念', '减肥', '愤怒/内疚']
  },
  indicationTags: ['emoções', 'liberação', 'toque', 'meridianos', 'autoaplicavel'],
  contraindications: {
    pt: ['Nenhuma grave', 'Pode trazer à tona emoções intensas (abreação)', 'Em casos de trauma severo, fazer com profissional'],
    en: ['None severe', 'Intense emotions may surface', 'Severe trauma requires professional'],
    es: ['Ninguna grave', 'Emociones intensas', 'Trauma severo requiere profesional'],
    zh: ['无严重禁忌', '可能浮现强烈情绪', '严重创伤需专业人员']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?w=500&h=300&fit=crop'
},
{
  id: 'geobiologia',
  name: { 
    pt: 'Geobiologia', 
    en: 'Geobiology', 
    es: 'Geobiología', 
    zh: '地质生物学' 
  },
  category: 'energy',
  description: {
    pt: 'Conhecida como "medicina do habitat", estuda o impacto do ambiente na saúde. Identifica e neutraliza radiações nocivas do solo, ondas eletromagnéticas e memórias energéticas de casas e empresas. Cria espaços saudáveis para viver.',
    en: 'Known as "habitat medicine", studies environment impact on health. Identifies and neutralizes harmful soil radiation and electromagnetic waves.',
    es: 'Conocida como "medicina del hábitat", estudia el impacto del ambiente en la salud. Neutraliza radiaciones nocivas y ondas electromagnéticas.',
    zh: '被称为“栖息地医学”，研究环境对健康的影响。识别并中和有害的土壤辐射和电磁波。'
  },
  indications: {
    pt: ['Insônia sem causa aparente', 'Doenças degenerativas na família', 'Cansaço ao acordar', 'Brigas constantes em casa', 'Plantas que não vingam', 'Empresas com baixa prosperidade', 'Venda de imóveis estagnados'],
    en: ['Unexplained insomnia', 'Degenerative diseases', 'Tiredness upon waking', 'Family fights', 'Dying plants', 'Low business prosperity', 'Stagnant real estate'],
    es: ['Insomnio', 'Enfermedades degenerativas', 'Cansancio', 'Peleas familiares', 'Plantas mueren', 'Baja prosperidad', 'Inmuebles estancados'],
    zh: ['不明失眠', '退行性疾病', '醒来疲劳', '家庭争吵', '植物枯死', '生意不景气', '房地产停滞']
  },
  indicationTags: ['casa', 'ambiente', 'radiação', 'limpeza', 'espaço'],
  contraindications: {
    pt: ['Não se aplica a pessoas diretamente, mas a ambientes', 'Não substitui tratamento médico dos habitantes'],
    en: ['Applies to environments, not people', 'Not a medical substitute'],
    es: ['Aplica a ambientes', 'No sustituye médico'],
    zh: ['适用于环境', '不可替代医疗']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&h=300&fit=crop'
},
{
  id: 'mesa-radionica',
  name: { 
    pt: 'Mesa Radiônica', 
    en: 'Radionic Table', 
    es: 'Mesa Radiónica', 
    zh: '放射性表' 
  },
  category: 'energy',
  description: {
    pt: 'Instrumento quântico que utiliza gráficos geométricos sagrados e um pêndulo. O operador diagnostica frequências nocivas e ativa ferramentas para transmutar energias em qualquer área da vida (saúde, finanças, amor). Atua à distância, no campo morfogenético.',
    en: 'Quantum instrument using sacred geometry charts and a pendulum. Diagnoses harmful frequencies and activates tools to transmute energies in any life area.',
    es: 'Instrumento cuántico con gráficos y péndulo. Diagnostica frecuencias nocivas y transmuta energías en cualquier área de la vida.',
    zh: '使用神圣几何图表和钟摆的量子仪器。诊断有害频率并在任何生活领域转化能量。'
  },
  indications: {
    pt: ['Bloqueios financeiros e profissionais', 'Harmonização de relacionamentos', 'Limpeza de magia e inveja', 'Saúde e vitalidade', 'Venda de imóveis', 'Abertura de caminhos', 'Equilíbrio dos chakras'],
    en: ['Financial blocks', 'Relationship harmonization', 'Energy cleansing', 'Health', 'Real estate sales', 'Path opening', 'Chakra balance'],
    es: ['Bloqueos financieros', 'Relaciones', 'Limpieza energética', 'Salud', 'Venta inmuebles', 'Abrir caminos', 'Chakras'],
    zh: ['财务障碍', '关系和谐', '能量清洁', '健康', '房地产销售', '开路', '脉轮平衡']
  },
  indicationTags: ['radiestesia', 'quantico', 'distancia', 'transmutação', 'pendulo'],
  contraindications: {
    pt: ['Nenhuma contraindicação para o consulente', 'Depende da ética e capacidade do operador', 'Não cria dependência'],
    en: ['No contraindications for client', 'Depends on operator ethics', 'No dependency'],
    es: ['Sin contraindicaciones cliente', 'Depende ética operador', 'Sin dependencia'],
    zh: ['客户无禁忌', '取决于操作者道德', '无依赖性']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=500&h=300&fit=crop'
},
{
  id: 'radiestesia',
  name: { 
    pt: 'Radiestesia', 
    en: 'Dowsing', 
    es: 'Radiestesia', 
    zh: '探瑞术' 
  },
  category: 'energy',
  description: {
    pt: 'Ciência de detecção de energias sutis através de instrumentos como pêndulos e varinhas (dual rod). É usada principalmente para diagnóstico e medição de campos energéticos, compatibilidade de alimentos e localização de água ou minerais. É a arte de "sentir" a radiação.',
    en: 'Science of detecting subtle energies using instruments like pendulums. Used for diagnosis, measuring energy fields, and locating water/minerals.',
    es: 'Ciencia de detección de energías sutiles con péndulos. Usada para diagnóstico, medición de campos y localización de agua.',
    zh: '使用钟摆等仪器检测微弱能量的科学。用于诊断、测量能量场和定位水/矿物。'
  },
  indications: {
    pt: ['Medição dos chakras', 'Compatibilidade alimentar', 'Escolha de florais ou remédios', 'Análise de ambientes (casas)', 'Localização de objetos perdidos', 'Diagnóstico energético', 'Perguntas de sim/não'],
    en: ['Chakra measurement', 'Food compatibility', 'Remedy selection', 'Environment analysis', 'Lost objects', 'Energy diagnosis', 'Yes/No questions'],
    es: ['Medición chakras', 'Compatibilidad alimentos', 'Selección remedios', 'Análisis ambientes', 'Objetos perdidos', 'Diagnóstico', 'Preguntas Si/No'],
    zh: ['脉轮测量', '食物相容性', '药物选择', '环境分析', '丢失物体', '能量诊断', '是/否问题']
  },
  indicationTags: ['pendulo', 'medicao', 'diagnostico', 'energia', 'vibração'],
  contraindications: {
    pt: ['Não interfere no corpo diretamente (apenas medição)', 'Requer mente neutra do operador para não influenciar o resultado'],
    en: ['No direct body interference', 'Requires operator neutrality'],
    es: ['Sin interferencia corporal', 'Requiere neutralidad operador'],
    zh: ['无直接身体干扰', '需要操作者中立']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1603504958668-3e4b7b514d95?w=500&h=300&fit=crop'
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
    pt: 'Estudo da correlação entre a posição dos corpos celestes e os eventos na Terra. O Mapa Astral natal é uma ferramenta profunda de autoconhecimento, revelando padrões de personalidade, talentos e desafios. Não é determinista, mas sim orientativo.',
    en: 'Study of the correlation between celestial bodies and earthly events. The Natal Chart is a tool for self-knowledge, revealing personality patterns and talents.',
    es: 'Estudio de la correlación entre cuerpos celestes y eventos terrestres. La Carta Natal revela patrones de personalidad, talentos y desafíos.',
    zh: '研究天体位置与地球事件的关联。本命盘是自我认识的工具，揭示性格模式和天赋。'
  },
  indications: {
    pt: ['Autoconhecimento profundo', 'Orientação vocacional/carreira', 'Entendimento de relacionamentos (Sinastria)', 'Previsão de tendências (Trânsitos)', 'Missão de vida', 'Momentos de crise', 'Planejamento anual'],
    en: ['Self-knowledge', 'Career guidance', 'Relationships (Synastry)', 'Forecasting (Transits)', 'Life mission', 'Crisis moments', 'Annual planning'],
    es: ['Autoconocimiento', 'Orientación vocacional', 'Relaciones', 'Predicciones', 'Misión de vida', 'Crisis', 'Planificación'],
    zh: ['自我认识', '职业指导', '关系', '预测', '人生使命', '危机时刻', '年度计划']
  },
  indicationTags: ['mapa', 'planetas', 'signos', 'autoconhecimento', 'destino'],
  contraindications: {
    pt: ['Não substitui terapia psicológica', 'Pode gerar ansiedade se focada apenas em previsões negativas', 'Fatalismo (acreditar que tudo está escrito)'],
    en: ['Not a therapy substitute', 'Anxiety from negative predictions', 'Fatalism'],
    es: ['No sustituye terapia', 'Ansiedad por predicciones', 'Fatalismo'],
    zh: ['不可替代治疗', '负面预测导致焦虑', '宿命论']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=500&h=300&fit=crop'
},
{
  id: 'coaching',
  name: { 
    pt: 'Coaching Holístico', 
    en: 'Holistic Coaching', 
    es: 'Coaching Holístico', 
    zh: '整体辅导' 
  },
  category: 'mind',
  description: {
    pt: 'Processo de desenvolvimento humano focado em atingir metas e desbloquear potencial. A abordagem holística considera não apenas o sucesso profissional, mas o equilíbrio entre vida pessoal, valores espirituais e saúde. É orientado para ação e futuro.',
    en: 'Human development process focused on goals and unlocking potential. Holistic approach considers professional success, personal life, spiritual values, and health.',
    es: 'Proceso de desarrollo enfocado en metas. El enfoque holístico considera éxito profesional, vida personal, valores y salud.',
    zh: '专注于目标和释放潜力的过程。整体方法考虑职业成功、个人生活、价值观和健康。'
  },
  indications: {
    pt: ['Transição de carreira', 'Definição de propósito de vida', 'Melhora da produtividade', 'Desenvolvimento de liderança', 'Equilíbrio vida-trabalho', 'Concretização de sonhos', 'Organização pessoal'],
    en: ['Career transition', 'Life purpose', 'Productivity', 'Leadership', 'Work-life balance', 'Dream realization', 'Organization'],
    es: ['Transición carrera', 'Propósito vida', 'Productividad', 'Liderazgo', 'Equilibrio vida-trabajo', 'Sueños', 'Organización'],
    zh: ['职业转型', '人生目标', '生产力', '领导力', '工作生活平衡', '梦想实现', '组织']
  },
  indicationTags: ['metas', 'foco', 'carreira', 'ação', 'futuro'],
  contraindications: {
    pt: ['Transtornos mentais (depressão/ansiedade graves)', 'Traumas profundos (requer terapia)', 'Busca por conselhos prontos (coach não dá conselhos)', 'Falta de comprometimento com ações'],
    en: ['Mental disorders', 'Deep trauma', 'Seeking advice', 'Lack of commitment'],
    es: ['Trastornos mentales', 'Traumas profundos', 'Buscar consejos', 'Falta compromiso'],
    zh: ['精神障碍', '深度创伤', '寻求建议', '缺乏承诺']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=300&fit=crop'
},
{
  id: 'eneagrama',
  name: { 
    pt: 'Eneagrama', 
    en: 'Enneagram', 
    es: 'Eneagrama', 
    zh: '九型人格' 
  },
  category: 'mind',
  description: {
    pt: 'Mapa psico-espiritual que descreve nove tipos de personalidade (arquétipos) e suas motivações inconscientes. Ajuda a entender por que agimos como agimos e oferece um caminho de crescimento para sair do "piloto automático".',
    en: 'Psycho-spiritual map describing nine personality types and unconscious motivations. Helps understand actions and offers a growth path.',
    es: 'Mapa psico-espiritual que describe nueve tipos de personalidad y motivaciones inconscientes. Ayuda a entender acciones y ofrece crecimiento.',
    zh: '描述九种人格类型和潜意识动机的心理精神图谱。帮助理解行为并提供成长路径。'
  },
  indications: {
    pt: ['Autoconhecimento profundo', 'Melhora da inteligência emocional', 'Resolução de conflitos', 'Liderança e gestão de equipes', 'Compreensão dos outros', 'Quebra de padrões comportamentais', 'Crescimento espiritual'],
    en: ['Deep self-knowledge', 'Emotional intelligence', 'Conflict resolution', 'Leadership', 'Understanding others', 'Breaking patterns', 'Spiritual growth'],
    es: ['Autoconocimiento', 'Inteligencia emocional', 'Conflictos', 'Liderazgo', 'Comprensión', 'Romper patrones', 'Crecimiento'],
    zh: ['深度自我认识', '情商', '冲突解决', '领导力', '理解他人', '打破模式', '精神成长']
  },
  indicationTags: ['personalidade', 'tipo', 'psicologia', 'mapa', 'evolução'],
  contraindications: {
    pt: ['Uso para rotular ou julgar pessoas', 'Não é diagnóstico psiquiátrico', 'Pode ser desconfortável encarar as próprias sombras'],
    en: ['Labeling/Judging', 'Not psychiatric diagnosis', 'Facing shadows uncomfortable'],
    es: ['Etiquetar/Juzgar', 'No diagnóstico', 'Encarar sombras'],
    zh: ['贴标签/评判', '非精神诊断', '面对阴影不适']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1555443358-154433e50669?w=500&h=300&fit=crop'
},
{
  id: 'mindfulness',
  name: { 
    pt: 'Mindfulness', 
    en: 'Mindfulness', 
    es: 'Atención Plena', 
    zh: '正念' 
  },
  category: 'mind',
  description: {
    pt: 'Treinamento de Atenção Plena que ensina a focar no momento presente de forma intencional e sem julgamentos. Baseado em práticas budistas, mas secularizado para redução de estresse. Ajuda a sair do modo "fazer" para o modo "ser".',
    en: 'Training to focus on the present moment intentionally and without judgment. Secularized Buddhist practice for stress reduction.',
    es: 'Entrenamiento de Atención Plena para enfocar en el presente sin juicios. Práctica budista secularizada para reducir estrés.',
    zh: '有意且不加评判地专注于当下的训练。用于减压的世俗化佛教习俗。'
  },
  indications: {
    pt: ['Ansiedade generalizada', 'Prevenção de recaída em depressão', 'Gerenciamento de dor crônica', 'Compulsão alimentar', 'Melhora do foco', 'Regulação emocional', 'Burnout'],
    en: ['Generalized anxiety', 'Depression relapse prevention', 'Chronic pain management', 'Binge eating', 'Focus', 'Emotional regulation', 'Burnout'],
    es: ['Ansiedad', 'Prevención depresión', 'Dolor crónico', 'Atracones', 'Enfoque', 'Regulación emocional', 'Burnout'],
    zh: ['广泛性焦虑', '抑郁复发预防', '慢性疼痛管理', '暴饮暴食', '专注', '情绪调节', '职业倦怠']
  },
  indicationTags: ['foco', 'presente', 'atenção', 'respiração', 'neurociencia'],
  contraindications: {
    pt: ['Fases agudas de trauma (pode haver dissociação)', 'Psicoses ativas', 'Requer prática consistente para resultados', 'Expectativa de relaxamento imediato (nem sempre ocorre)'],
    en: ['Acute trauma', 'Active psychosis', 'Requires consistency', 'Expectation of immediate relaxation'],
    es: ['Trauma agudo', 'Psicosis activa', 'Requiere constancia', 'Expectativa relajación inmediata'],
    zh: ['急性创伤', '活动性精神病', '需要坚持', '立即放松的期望']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1499209974431-2761e25236d6?w=500&h=300&fit=crop'
},
{
  id: 'numerologia',
  name: { 
    pt: 'Numerologia', 
    en: 'Numerology', 
    es: 'Numerología', 
    zh: '数字命理学' 
  },
  category: 'mind',
  description: {
    pt: 'Estudo do simbolismo dos números e sua influência na vida humana. Através do nome e data de nascimento, revela-se a missão de vida, talentos latentes e ciclos temporais (ano pessoal). Pitagórica e Cabalística são as vertentes mais comuns.',
    en: 'Study of number symbolism and its influence. Reveals life mission, talents, and cycles via name and birth date.',
    es: 'Estudio del simbolismo de los números. Revela misión de vida, talentos y ciclos a través del nombre y fecha de nacimiento.',
    zh: '研究数字象征及其影响。通过名字和出生日期揭示人生使命、天赋和周期。'
  },
  indications: {
    pt: ['Autoconhecimento', 'Escolha de nome para bebês/empresas', 'Orientação vocacional', 'Entendimento de ciclos de vida', 'Compatibilidade de relacionamentos', 'Tomada de decisões', 'Assinatura de poder'],
    en: ['Self-knowledge', 'Naming babies/companies', 'Career guidance', 'Life cycles', 'Compatibility', 'Decision making', 'Power signature'],
    es: ['Autoconocimiento', 'Nombres', 'Vocación', 'Ciclos vida', 'Compatibilidad', 'Decisiones', 'Firma'],
    zh: ['自我认识', '命名', '职业指导', '生命周期', '相容性', '决策', '签名']
  },
  indicationTags: ['numeros', 'mapa', 'destino', 'ciclos', 'nome'],
  contraindications: {
    pt: ['Nenhuma contraindicação', 'Não deve ser usada para jogos de azar', 'Interpretação requer profissional qualificado'],
    en: ['No contraindications', 'Not for gambling', 'Requires qualified professional'],
    es: ['Sin contraindicaciones', 'No para juegos azar', 'Requiere profesional'],
    zh: ['无禁忌', '不用于赌博', '需专业人员']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=500&h=300&fit=crop'
},
{
  id: 'pnl',
  name: { 
    pt: 'PNL', 
    en: 'NLP', 
    es: 'PNL', 
    zh: '神经语言规划' 
  },
  category: 'mind',
  description: {
    pt: 'Programação Neurolinguística é o estudo da estrutura da experiência subjetiva. Oferece ferramentas para reprogramar o cérebro, alterando como processamos informações e reagimos emocionalmente. Muito usada para comunicação e mudança de hábitos.',
    en: 'Neuro-Linguistic Programming studies subjective experience structure. Tools to reprogram the brain, altering information processing and emotional reaction.',
    es: 'Programación Neurolingüística estudia la experiencia subjetiva. Herramientas para reprogramar el cerebro y alterar reacciones emocionales.',
    zh: '神经语言规划研究主观体验结构。重新编程大脑、改变信息处理和情绪反应的工具。'
  },
  indications: {
    pt: ['Cura de fobias rápidas', 'Melhora da comunicação', 'Mudança de hábitos indesejados', 'Aumento da autoconfiança (Ancoragem)', 'Resolução de conflitos internos', 'Modelagem de excelência', 'Vendas e negociação'],
    en: ['Phobia cure', 'Communication', 'Habit change', 'Self-confidence', 'Internal conflicts', 'Modeling excellence', 'Sales'],
    es: ['Cura fobias', 'Comunicación', 'Cambio hábitos', 'Autoconfianza', 'Conflictos internos', 'Modelado', 'Ventas'],
    zh: ['恐惧症治愈', '沟通', '习惯改变', '自信', '内心冲突', '卓越模仿', '销售']
  },
  indicationTags: ['mente', 'linguagem', 'comportamento', 'sucesso', 'modelagem'],
  contraindications: {
    pt: ['Transtornos de personalidade graves', 'Uso manipulativo das técnicas', 'Não substitui tratamento psiquiátrico'],
    en: ['Severe personality disorders', 'Manipulative use', 'Not psychiatric substitute'],
    es: ['Trastornos graves', 'Uso manipulativo', 'No sustituye psiquiatría'],
    zh: ['严重人格障碍', '操纵性使用', '不可替代精神科']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop'
},
{
  id: 'terapia-floral',
  name: { 
    pt: 'Terapia Floral', 
    en: 'Flower Essence Therapy', 
    es: 'Terapia Floral', 
    zh: '花精疗法' 
  },
  category: 'mind',
  description: {
    pt: 'Sistema terapêutico que usa essências vibracionais de flores para equilibrar emoções. Os mais famosos são os Florais de Bach. Eles não possuem princípio ativo químico, agindo por ressonância energética para transformar estados negativos em positivos.',
    en: 'Therapeutic system using vibrational flower essences to balance emotions. Acts via energy resonance to transform negative states into positive ones.',
    es: 'Sistema terapéutico que usa esencias florales para equilibrar emociones. Actúa por resonancia energética para transformar estados negativos.',
    zh: '使用花卉振动精华平衡情绪的治疗系统。通过能量共鸣将消极状态转化为积极状态。'
  },
  indications: {
    pt: ['Medos conhecidos e desconhecidos', 'Indecisão e incerteza', 'Falta de interesse no presente', 'Solidão', 'Hipersensibilidade', 'Desespero e desalento', 'Preocupação excessiva'],
    en: ['Fears', 'Indecision', 'Lack of interest', 'Loneliness', 'Hypersensitivity', 'Despair', 'Worry'],
    es: ['Miedos', 'Indecisión', 'Falta interés', 'Soledad', 'Hipersensibilidad', 'Desesperación', 'Preocupación'],
    zh: ['恐惧', '优柔寡断', '缺乏兴趣', '孤独', '过敏', '绝望', '担忧']
  },
  indicationTags: ['florais', 'emoções', 'sutil', 'gotas', 'natureza'],
  contraindications: {
    pt: ['Nenhuma contraindicação (seguro para bebês e animais)', 'Cuidado com conservante alcoólico (pedir base em glicerina para alcoólatras)'],
    en: ['No contraindications', 'Alcohol preservative caution (use glycerin base)'],
    es: ['Sin contraindicaciones', 'Cuidado alcohol (usar glicerina)'],
    zh: ['无禁忌', '酒精防腐剂注意（使用甘油基）']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=500&h=300&fit=crop'
},
{
  id: 'taro',
  name: { 
    pt: 'Tarô Terapêutico', 
    en: 'Therapeutic Tarot', 
    es: 'Tarot Terapéutico', 
    zh: '塔罗疗法' 
  },
  category: 'mind',
  description: {
    pt: 'Uso das cartas de Tarô como ferramenta de projeção psicológica e orientação, dissociado de adivinhação. Os arquétipos das cartas (O Louco, A Morte, O Sol) ajudam o cliente a acessar sabedoria inconsciente e clarificar situações da vida.',
    en: 'Use of Tarot cards as a tool for psychological projection and guidance, dissociated from divination. Card archetypes help access unconscious wisdom.',
    es: 'Uso del Tarot como herramienta de proyección psicológica y orientación. Los arquetipos ayudan a acceder a la sabiduría inconsciente.',
    zh: '使用塔罗牌作为心理投射和指导工具，与占卜分离。卡片原型有助于获得潜意识智慧。'
  },
  indications: {
    pt: ['Tomada de decisões difíceis', 'Análise de situações complexas', 'Autoconhecimento', 'Identificação de bloqueios', 'Orientação de caminhos', 'Validação da intuição', 'Clareza mental'],
    en: ['Decision making', 'Complex situations', 'Self-knowledge', 'Block identification', 'Guidance', 'Intuition validation', 'Clarity'],
    es: ['Toma decisiones', 'Situaciones complejas', 'Autoconocimiento', 'Bloqueos', 'Orientación', 'Validación intuición', 'Claridad'],
    zh: ['决策', '复杂情况', '自我认识', '障碍识别', '指导', '直觉验证', '清晰']
  },
  indicationTags: ['arquetipos', 'cartas', 'simbolos', 'inconsciente', 'orientação'],
  contraindications: {
    pt: ['Pessoas em surto psicótico (pode confundir realidade)', 'Dependência de oráculos para qualquer decisão', 'Medo excessivo de "previsões"'],
    en: ['Psychotic episode', 'Oracle dependency', 'Fear of predictions'],
    es: ['Brote psicótico', 'Dependencia oráculos', 'Miedo predicciones'],
    zh: ['精神病发作', '神谕依赖', '预测恐惧']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1572097662444-13c233364f9b?w=500&h=300&fit=crop'
},
{
  id: 'homeopatia',
  name: { 
    pt: 'Homeopatia', 
    en: 'Homeopathy', 
    es: 'Homeopatía', 
    zh: '顺势疗法' 
  },
  category: 'nature',
  description: {
    pt: 'Sistema médico baseado no princípio "o semelhante cura o semelhante". Utiliza substâncias ultra-diluídas e dinamizadas que, em doses altas, causariam os sintomas, mas diluídas estimulam a energia vital do corpo a reagir e curar a doença.',
    en: 'Medical system based on "like cures like". Uses ultra-diluted substances to stimulate the body\'s vital energy to react and heal.',
    es: 'Sistema médico basado en "lo similar cura lo similar". Usa sustancias ultra-diluidas para estimular la energía vital del cuerpo.',
    zh: '基于“同类相治”原则的医疗系统。使用超稀释物质刺激身体生命能量进行愈合。'
  },
  indications: {
    pt: ['Alergias e rinites', 'Doenças crônicas e autoimunes', 'Distúrbios emocionais e mentais', 'Doenças infantis recorrentes', 'Problemas de pele', 'Enxaquecas', 'Fortalecimento do terreno biológico'],
    en: ['Allergies', 'Chronic/Autoimmune diseases', 'Emotional disorders', 'Childhood diseases', 'Skin problems', 'Migraines', 'Strengthening'],
    es: ['Alergias', 'Enfermedades crónicas', 'Trastornos emocionales', 'Enfermedades infantiles', 'Piel', 'Migrañas', 'Fortalecimiento'],
    zh: ['过敏', '慢性/自身免疫病', '情绪障碍', '儿童疾病', '皮肤问题', '偏头痛', '强化']
  },
  indicationTags: ['diluição', 'vitalismo', 'imunidade', 'natural', 'individualizado'],
  contraindications: {
    pt: ['Substituição de tratamento vital em emergências (ex: infecção generalizada)', 'Ceticismo que impede adesão ao tratamento', 'Requer acompanhamento especializado'],
    en: ['Emergency substitution', 'Skepticism', 'Requires specialized follow-up'],
    es: ['Sustitución emergencias', 'Escepticismo', 'Requiere seguimiento'],
    zh: ['紧急替代', '怀疑论', '需专门随访']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&h=300&fit=crop'
},
{
  id: 'iridologia',
  name: { 
    pt: 'Iridologia', 
    en: 'Iridology', 
    es: 'Iridología', 
    zh: '虹膜学' 
  },
  category: 'nature',
  description: {
    pt: 'Ciência de análise da íris (a parte colorida dos olhos) para revelar as condições de saúde do corpo. A íris é conectada ao cérebro e registra marcas, cores e sinais que indicam fragilidades genéticas, inflamações e estado dos órgãos.',
    en: 'Science of analyzing the iris to reveal health conditions. The iris records marks and colors indicating genetic weaknesses, inflammation, and organ state.',
    es: 'Ciencia de análisis del iris para revelar condiciones de salud. El iris registra marcas que indican debilidades genéticas, inflamación y estado de órganos.',
    zh: '分析虹膜以揭示健康状况的科学。虹膜记录指示遗传弱点、炎症和器官状态的标记。'
  },
  indications: {
    pt: ['Check-up preventivo de saúde', 'Identificação de órgãos de choque (frágeis)', 'Níveis de toxidade no corpo', 'Estado do sistema nervoso', 'Carências nutricionais', 'Tendências genéticas', 'Acidez corporal'],
    en: ['Preventive check-up', 'Weak organs ID', 'Toxicity levels', 'Nervous system state', 'Nutritional deficiencies', 'Genetic trends', 'Body acidity'],
    es: ['Chequeo preventivo', 'Órganos débiles', 'Toxicidad', 'Sistema nervioso', 'Carencias nutricionales', 'Tendencias genéticas', 'Acidez'],
    zh: ['预防检查', '弱器官识别', '毒性水平', '神经系统状态', '营养缺乏', '遗传趋势', '身体酸度']
  },
  indicationTags: ['olhos', 'diagnostico', 'mapa', 'genetica', 'prevenção'],
  contraindications: {
    pt: ['Não diagnostica doenças com nome clínico (ex: "tem câncer"), mas sim condições teciduais', 'Não substitui exames de imagem e sangue'],
    en: ['Does not name clinical diseases', 'Not a substitute for imaging/blood tests'],
    es: ['No nombra enfermedades clínicas', 'No sustituye exámenes'],
    zh: ['不命名临床疾病', '不可替代影像/血液检查']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1594406203498-f58c44f5195e?w=500&h=300&fit=crop'
},
{
  id: 'nutricao-funcional',
  name: { 
    pt: 'Nutrição Funcional', 
    en: 'Functional Nutrition', 
    es: 'Nutrición Funcional', 
    zh: '功能营养' 
  },
  category: 'nature',
  description: {
    pt: 'Abordagem nutricional que foca na individualidade bioquímica. Não conta apenas calorias, mas avalia como os alimentos interagem com os genes, inflamação e metabolismo do paciente. Usa alimentos e suplementos para corrigir desequilíbrios.',
    en: 'Nutritional approach focusing on biochemical individuality. Evaluates interaction between food, genes, inflammation, and metabolism.',
    es: 'Enfoque nutricional centrado en la individualidad bioquímica. Evalúa interacción entre alimentos, genes, inflamación y metabolismo.',
    zh: '专注于生化个体的营养方法。评估食物、基因、炎症和代谢之间的相互作用。'
  },
  indications: {
    pt: ['Disbiose intestinal', 'Doenças autoimunes', 'Emagrecimento saudável', 'Fadiga mitocondrial', 'Alergias alimentares', 'Desequilíbrios hormonais', 'Performance esportiva'],
    en: ['Intestinal dysbiosis', 'Autoimmune diseases', 'Healthy weight loss', 'Mitochondrial fatigue', 'Food allergies', 'Hormonal imbalances', 'Sports performance'],
    es: ['Disbiosis', 'Autoinmunes', 'Adelgazamiento', 'Fatiga', 'Alergias', 'Hormonas', 'Rendimiento'],
    zh: ['肠道菌群失调', '自身免疫病', '健康减肥', '线粒体疲劳', '食物过敏', '荷尔蒙失衡', '运动表现']
  },
  indicationTags: ['dieta', 'alimentos', 'suplementos', 'saude', 'intestino'],
  contraindications: {
    pt: ['Nenhuma', 'Dietas restritivas devem ser feitas com acompanhamento para evitar transtornos alimentares'],
    en: ['None', 'Restrictive diets need supervision to avoid eating disorders'],
    es: ['Ninguna', 'Dietas restrictivas necesitan supervisión'],
    zh: ['无', '限制性饮食需监督']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=300&fit=crop'
},
{
  id: 'resgate-de-alma',
  name: { 
    pt: 'Resgate de Alma', 
    en: 'Soul Retrieval', 
    es: 'Recuperación del Alma', 
    zh: '灵魂复原' 
  },
  category: 'shamanic',
  description: {
    pt: 'Prática xamânica profunda para curar a fragmentação da alma. Acredita-se que traumas fazem partes da nossa energia vital "fugirem" para se proteger. O xamã viaja aos mundos espirituais para encontrar, curar e reintegrar essas partes perdidas.',
    en: 'Shamanic practice to heal soul fragmentation. Assumes trauma causes vital energy parts to flee. Shaman retrieves and reintegrates them.',
    es: 'Práctica chamánica para curar la fragmentación del alma. El chamán viaja a mundos espirituales para reintegrar partes perdidas por traumas.',
    zh: '治愈灵魂破碎的萨满习俗。萨满寻回并重新整合因创伤而逃离的生命能量部分。'
  },
  indications: {
    pt: ['Sensação de vazio interior', 'Memórias bloqueadas de trauma', 'Depressão crônica', 'Dissociação (não estar presente)', 'Síndrome do pânico', 'Pós-abuso', 'Recuperação de vitalidade'],
    en: ['Inner emptiness', 'Blocked memories', 'Chronic depression', 'Dissociation', 'Panic syndrome', 'Post-abuse', 'Vitality recovery'],
    es: ['Vacío interior', 'Memorias bloqueadas', 'Depresión crónica', 'Disociación', 'Pánico', 'Post-abuso', 'Vitalidad'],
    zh: ['内心空虚', '受阻记忆', '慢性抑郁', '分离', '恐慌综合症', '虐待后', '活力恢复']
  },
  indicationTags: ['alma', 'trauma', 'xamanismo', 'cura', 'integridade'],
  contraindications: {
    pt: ['Não deve ser feito sem preparação prévia', 'Transtornos psicóticos ativos', 'Pessoas que não querem reviver ou tratar o trauma'],
    en: ['Needs preparation', 'Active psychosis', 'Unwillingness to treat trauma'],
    es: ['Necesita preparación', 'Psicosis activa', 'No querer tratar trauma'],
    zh: ['需准备', '活动性精神病', '不愿治疗创伤']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=500&h=300&fit=crop'
},
{
  id: 'roda-de-cura',
  name: { 
    pt: 'Roda de Cura', 
    en: 'Healing Circle', 
    es: 'Círculo de Sanación', 
    zh: '愈合圈' 
  },
  category: 'shamanic',
  description: {
    pt: 'Cerimônia em grupo onde os participantes se sentam em círculo para partilhar, meditar ou realizar rituais. A energia coletiva potencializa a cura individual. Baseia-se no princípio de que todos somos iguais e conectados (Ubuntu/Mitakuye Oyasin).',
    en: 'Group ceremony where participants sit in a circle to share, meditate, or perform rituals. Collective energy enhances individual healing.',
    es: 'Ceremonia grupal en círculo para compartir, meditar o realizar rituales. La energía colectiva potencia la curación individual.',
    zh: '参与者围坐分享、冥想或举行仪式的团体仪式。集体能量增强个人愈合。'
  },
  indications: {
    pt: ['Sentimento de solidão', 'Necessidade de apoio comunitário', 'Processamento de luto', 'Celebração de ciclos', 'Empoderamento feminino/masculino', 'Cura de relações', 'Conexão espiritual'],
    en: ['Loneliness', 'Community support', 'Grief processing', 'Cycle celebration', 'Empowerment', 'Relationship healing', 'Spiritual connection'],
    es: ['Soledad', 'Apoyo comunitario', 'Duelo', 'Celebración', 'Empoderamiento', 'Curación relaciones', 'Conexión espiritual'],
    zh: ['孤独', '社区支持', '悲伤处理', '周期庆祝', '赋权', '关系愈合', '精神连接']
  },
  indicationTags: ['grupo', 'comunidade', 'partilha', 'circulo', 'apoio'],
  contraindications: {
    pt: ['Fobia social grave', 'Doenças contagiosas (para presencial)', 'Pessoas perturbadoras da ordem do grupo'],
    en: ['Severe social phobia', 'Contagious diseases', 'Disruptive behavior'],
    es: ['Fobia social', 'Enfermedades contagiosas', 'Comportamiento disruptivo'],
    zh: ['严重社交恐惧症', '传染病', '破坏性行为']
  },
  modality: 'presencial_online',
  image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=500&h=300&fit=crop'
}