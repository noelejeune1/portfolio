// Traductions des données de projets
const projectsDataTranslations = {
    en: {
        'infographie': {
            title: "Infographic - Science Festival",
            description: "As part of the Science Festival that will take place throughout France in autumn 2025, on the theme of 'Intelligence'. The IUT of Lannion will be represented by departments in Lannion. This project aims to make an attractive subject that impacts all of us.",
            missions: [
                "Target audience identification",
                "Prototype creation",
                "Finalization of the infographic"
            ],
            competences: ["Affinity Designer", "Vector drawing", "Page layout"],
            technologies: ["Graphic production", "Communication"]
        },
        'app_fitness': {
            title: "LocFit - SAE 301",
            description: "LocFit is a project that aims to create a sports equipment rental platform based on a persona user profile that was given to us beforehand. <br><br>It allowed us to adapt our website according to its constraints. On the site, the user can authenticate with an account to give them their role (customer, admin, manager).",
            missions: [
                "Identification and understanding of persona constraints",
                "Idealization of a mockup for LocFit",
                "Website creation"
            ],
            competences: ["UX-UI", "Project management", "WEB Development"],
            technologies: ["Graphic design", "WEB Development"]
        },
        'deh_watch': {
            title: "DehWatch – Eco-responsible E-commerce Store (PrestaShop)",
            description: "Carried out as part of the R3.14 resource (Deployment Brandkey Depot), this project consisted of designing a complete e-commerce solution. The concept, named \"DehWatch\", offers a sustainable alternative to traditional watchmaking. The goal was to create an online store for futuristic design watches, made exclusively from recycled materials (plastic, wood, plant fibers), thus transforming waste into luxury objects for an engaged clientele.",
            missions: [
                "Concept and identity definition: Creation of a \"futuristic and sustainable\" brand image, using a green and brown color palette to remind the ecological aspect and an adapted logo.",
                "CMS technical configuration (PrestaShop): Store installation, configuration of low environmental impact delivery modes and payment solutions.",
                "Product catalog management: Structuring categories (Men/Women/Promotions) and creating detailed product sheets. Setting up complex variations to allow watch customization (strap change, material choices).",
                "Design customization (UI): Using a plugin (\"Classy Custom CSS\") to modify PrestaShop's native appearance. Adapting buttons and menus to match the brand's graphic universe and \"Full width\" layout to highlight visuals."
            ],
            competences: [
                "E-commerce Development (CMS)",
                "Web Design & CSS Integration",
                "Product catalog management",
                "UI Customization"
            ],
            technologies: ["PrestaShop", "Classy Custom CSS"]
        },
        'voeux_2026': {
            title: "New Year 2026",
            description: "As part of the Artistic Culture resource, this project aimed to design greeting cards for the new year 2026 on behalf of the IUT of Lannion, available in two versions: tangible and intangible. The tangible version concerns our printed card, while the intangible version is an animated and interactive digital card, intended to be sent by email.",
            missions: [
                "Creation of a greeting card in the colors of the IUT departments.",
                "Design of web animation simulating a scratch-off greeting ticket.",
                "Implementation of a format adapted to email sending, optimized for standard email clients."
            ],
            competences: ["Graphic design", "HTML", "CSS", "JavaScript"],
            technologies: ["Graphic production", "Web Development"]
        },
        'bretagne_pass': {
            title: "Bretagne Pass – Entertainment venues in Trégor",
            description: "The project consists of designing a mockup of a mobile and responsive application that allows users to see the programming of the main entertainment venues in Trégor. The goal is to facilitate access to the local cultural offering by allowing the user to find an outing idea and book one or more seats from a clear, accessible and user-friendly interface.",
            missions: [
                "Analysis of the offering of the main entertainment venues in Trégor (Carré Magique, An Dour Meur, Sémaphore, Théâtre de l'Arche, Le Sillon, Le SKOPE).",
                "Benchmarking of other cultural aggregation platforms to identify best practices and areas for improvement.",
                "Creation of wireframes (home page and access to activities) with comments on ergonomics and navigation choices.",
                "Development of a complete design system (colors, fonts, components, cards, forms, touch interactors).",
                "Creation of a functional mockup on Figma illustrating a complete user journey, from discovering a show to booking.",
                "Formatting of an instruction file grouping analysis, concepts and mockups."
            ],
            competences: ["UX/UI", "Prototyping", "Design system", "Figma"],
            technologies: ["Interactive design", "Mockup", "Content structuring"]
        },
        'affiche_neymar': {
            title: "Sports Poster – Tribute to Neymar Jr",
            description: "This personal project aims to design a promotional poster like a \"collector poster\" celebrating player Neymar Jr's time at FC Barcelona (2013-2017 period). The goal is to create a strong visual composition that hierarch izes information dynamically: attract attention through visual and title, then inform via biography and key statistics, while respecting the club's visual identity.",
            missions: [
                "Research and image processing: Iconographic selection and precise cutout of the player to integrate on a composite background.",
                "Artistic direction: Creation of a graphic atmosphere using the club's color codes (Blue and Garnet) with the addition of textures to give depth and a 'sports magazine' aspect.",
                "Typographic work: Association of contrasting fonts for the title, body text and statistics.",
                "Layout and hierarchization: Structuring the poster in several reading levels.",
                "Data visualization: Design of a lower banner synthesizing the record using pictograms and key figures."
            ],
            competences: ["Affinity Studio", "Editorial layout", "Photo retouching"],
            technologies: ["Graphic production", "Visual communication"]
        },
        'sae_104': {
            title: "Fiction Short Film – Psychological Thriller (SAE 104)",
            description: "As part of SAE 104, this project consists of designing and preparing the shooting of a narrative fiction sequence. The goal is to tell a short story with a psychological twist (plot twist), mastering cinematographic language (shot scales, cuts, lighting) and technical preparation via precise breakdown. The script features Tom, an office employee who discovers a crime scene before realizing, in front of his mirror, that he is himself the murderer.",
            missions: [
                "Writing and Scripting: Designing a scenario based on duality and dissociative identity disorder.",
                "Technical breakdown (Shotlist): Development of a complete shooting document listing chronology, estimated durations, and precise descriptions of action and audio for each shot.",
                "Staging and framing choices: Using a variety of shot values to pace the narrative.",
                "Atmosphere management (Light and Sound): Creating an evolving atmosphere, moving from a calm natural light to dramatic tension."
            ],
            competences: ["Audiovisual pre-production", "Image language", "Narration"],
            technologies: ["Scripting", "Technical breakdown", "Direction"]
        },
        'rendu_3d': {
            title: "Producing a 3D desk",
            description: "Carried out as part of R3.19 (BUT2 MMI), this project aimed to reproduce a reference image with the highest degree of fidelity possible. The goal was to create a photorealistic 3D scene representing a still life of a desk (books, pens, pencil holder) by meticulously working on shapes, materials, lighting and composition to match the warm and textured atmosphere of the original.",
            missions: [
                "Polygon modeling: Precise creation of objects (notebooks, pens, pot) respecting proportions and geometric details of the reference image.",
                "Material work (Shading): Development of realistic textures, including wood grain for the desk, paper for notebooks and plastic or metallic finishes for pens.",
                "Lighting management (Lighting): Setting up a complex lighting scheme to reproduce the intimate atmosphere and soft cast shadows, simulating a low natural light.",
                "Composition and Camera: Precise positioning of the camera and focal length adjustment (depth of field) to match framing and optical effects of the source image.",
                "Organization: Rigorous structuring of the scene (Scene Collection) for efficient management of objects and lights."
            ],
            competences: ["3D Modeling", "Texturing", "Lighting", "Composition"],
            technologies: ["Blender", "Modeling"]
        },
        'crous_2050': {
            title: "Webmagazine – The 2050 University Restaurant of IUT Lannion",
            description: "Carried out as part of the R308/R306 resources, this writing project aimed to imagine the future of university catering in 2050. The goal was to write an immersive and interactive article presenting a reinvented university restaurant to meet tomorrow's challenges: ecology, new diets, budget constraints and inclusion. The narrative had to guide the reader through a futuristic user experience, from automated entry to the nutritional analysis of the tray.",
            missions: [
                "Scriptwriting and Concept: Development of a coherent narrative universe ('The University Restaurant of the future: interactive journey'), structured around a fictional guided tour. Definition of targets (students, staff) and tone (informative, immersive).",
                "Web writing (SEO): Writing an article optimized for the web, structured in clear chapters (The concept, User experience, New menus). Strategic use of long-tail keywords for SEO.",
                "Design of innovative content: Imagining detailed futuristic services such as The Interactive Map, The Thematic Bars ('Plant Bar', 'Insect-Lab', 'Supplements Bar') and technologies such as automatic macronutrient analysis and AI payment.",
                "Formatting and Accessibility: Integration of multilingual voice messages for reception and visit, making content inclusive. Creation of detailed technical sheets for each new type of food."
            ],
            competences: ["Web writing", "Storytelling", "SEO", "Interactive content design"],
            technologies: ["WordPress", "Design fiction", "Digital accessibility"]
        },
        'affiche_leclerc': {
            title: "Sports Poster – Charles Leclerc (Belgian GP 2025)",
            description: "This personal graphic design project aims to recall Charles Leclerc's performance to predict his results at the Belgian Grand Prix 2025. The main objective was to transform raw data (race statistics) into a dynamic visual composition, recalling the aesthetic codes of Formula 1 and Scuderia Ferrari.",
            missions: [
                "Data hierarchization: Selection and highlighting of key statistics (Position, Lap time, Pit stops).",
                "Artistic direction: Respect for Scuderia Ferrari's graphic charter (Red, Yellow, Black) and integration of visual elements related to the Spa-Francorchamps circuit.",
                "Composition and Typography: Choice of impactful fonts to create dynamism and structure reading between the driver's visual and technical information.",
                "Staging: Careful cutout and integration of the driver to create depth of field."
            ],
            competences: ["Data visualization", "Photo retouching", "Affinity Studio"],
            technologies: ["Graphic production", "Visual communication"]
        },
        'motion_design': {
            title: "Motion Design – Learning After Effects",
            description: "This personal project was created to learn the fundamentals of motion design on Adobe After Effects. The goal was to become familiar with shape animation, keyframe management and speed smoothing to create fluid and dynamic transitions.",
            missions: [
                "Interface mastery: Learning shape layers, masks and compositions.",
                "Property animation: Using keyframes to animate position, scale, rotation and opacity.",
                "Speed smoothing (Graph Editor): Optimization of motion curves to obtain natural and professional animations.",
                "Audio synchronization: Sticking animations to a sound track to enhance visual impact."
            ],
            competences: ["2D Animation", "Motion Design", "Autonomy"],
            technologies: ["After Effects"]
        },
        'motion_liquid_glass': {
            title: "Motion Design – Liquid Glass",
            description: "This second personal motion design project aims to improve my mastery of After Effects by animating Apple assets with the 'Liquid Glass' effect, in order to highlight the novelties of this new environment.",
            missions: [
                "Interface mastery: Learning shape layers, masks and compositions.",
                "Property animation: Using keyframes to animate position, scale, rotation and opacity.",
                "Speed smoothing (Graph Editor): Optimization of motion curves to obtain natural and professional animations.",
                "Audio synchronization: Sticking animations to a sound track to enhance visual impact."
            ],
            competences: ["2D Animation", "Motion Design", "Autonomy"],
            technologies: ["After Effects"]
        }
    }
};

// Fonction helper pour récupérer les données du projet dans la langue courante
function getProjectData(projectId, lang = 'fr') {
    const baseData = projectsData[projectId];
    if (!baseData) return null;

    // Si on veut du français ou que la traduction anglaise n'existe pas, on retourne les données de base
    if (lang === 'fr' || !projectsDataTranslations.en[projectId]) {
        return baseData;
    }

    // Sinon, on merge les données de base avec la traduction
    return {
        ...baseData,
        ...projectsDataTranslations.en[projectId]
    };
}
