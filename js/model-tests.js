// Development Economics (0388 21 DS 2201)
// Timed Model Test Simulator & Practice Exams

const MODEL_TESTS_DATA = [
  {
    id: "test-midterm-1",
    title: "Model Test 1: Midterm Class Test (Section A Focus)",
    totalMarks: 30,
    durationMinutes: 60,
    instructions: "Answer all three questions. Write clear, analytical, and structured answers. Draw conceptual diagrams or matrices where relevant. Strict university marking criteria apply.",
    questions: [
      {
        qNum: 1,
        marks: 10,
        text: "Bangladesh's RMG sector has generated substantial export earnings and employment. However, workers may still face low wages, unsafe working conditions, and limited opportunities for upward mobility. If you were asked to judge whether the growth of Bangladesh's RMG sector has translated into 'development', choose three indicators that you would use and justify why each is necessary. Based on those indicators, construct a brief argument for why growth may or may not have produced development.",
        linkedQuestionId: "q-ch1-5m"
      },
      {
        qNum: 2,
        marks: 10,
        text: "Bangladesh has limited public resources and must choose between subsidizing physical infrastructure, expanding technical education, and supporting research and innovation. Using any two growth theories from the course, rank these three policy options according to which should receive priority. Your answer must show how the theories lead to different policy recommendations.",
        linkedQuestionId: "q-ch3-5m"
      },
      {
        qNum: 3,
        marks: 10,
        text: "Suppose two Bangladeshi districts have the following profiles:\nDistrict A: higher income, lower life expectancy, lower educational attainment.\nDistrict B: lower income, higher life expectancy, higher educational attainment.\nWithout calculating an HDI score, determine which district could plausibly have the higher level of human development. Explain your reasoning using the dimensions of the Human Development Index and identify one limitation of using HDI for this comparison.",
        linkedQuestionId: "q-ch4-5m"
      }
    ]
  },
  {
    id: "test-section-b",
    title: "Model Test 2: Poverty, Inequality & Institutions (Section B Special)",
    totalMarks: 30,
    durationMinutes: 60,
    instructions: "Answer all three questions. Show complete mathematical steps for calculations. Illustrate economic models and institutional mechanisms clearly.",
    questions: [
      {
        qNum: 1,
        marks: 10,
        text: "Question 1: Poverty and Its Measurement (10 marks)\nA survey of five households in Khulna records the following monthly per capita incomes: Tk 4,000, Tk 5,000, Tk 5,800, Tk 7,500 and Tk 10,000. Assume the poverty line is Tk 6,000 per person per month.\na. Identify the households classified as poor and calculate the poverty headcount ratio. (4 marks)\nb. Explain why the headcount ratio alone may not adequately describe the extent of poverty in this community. (3 marks)\nc. Suggest one additional indicator that could help the local authority identify the needs of poor households more accurately. Explain your choice. (3 marks)",
        linkedQuestionId: "q-ch6-10m"
      },
      {
        qNum: 2,
        marks: 10,
        text: "Question 2: Economic Inequality and Its Measurement (10 marks)\nA report shows that average income in a district of Bangladesh has increased, but many low-income households report little improvement in their living standards.\na. Why does average income alone fail to show how equally income is distributed? (3 marks)\nb. Explain how comparing the income shares of the richest 20% and poorest 20% of households can help measure inequality. (3 marks)\nc. What does the Gini coefficient tell us about income inequality? Explain what a higher Gini coefficient generally indicates. (4 marks)",
        linkedQuestionId: "q-ch7-10m"
      },
      {
        qNum: 3,
        marks: 10,
        text: "Question 3: Inclusive and Extractive Institutions (10 marks)\nIn a rural area of Khulna, a small group of influential traders controls access to crop storage, price information and market facilities. Small farmers have little bargaining power, face questionable weighing practices, and find it difficult to challenge unfair deductions. The local administration considers introducing transparent pricing, independent weighing facilities and a farmers' cooperative.\na. Explain why the existing arrangements may be considered extractive institutions. (4 marks)\nb. Explain how the proposed measures could help establish more inclusive institutions. (3 marks)\nc. Identify one obstacle that could prevent these reforms from benefiting small farmers and suggest how it could be addressed. (3 marks)",
        linkedQuestionId: "q-ch8-10m"
      }
    ]
  },
  {
    id: "test-comprehensive-final",
    title: "Model Test 3: Semester Final Examination (Full Syllabus Mock)",
    totalMarks: 60,
    durationMinutes: 120,
    instructions: "The exam is divided into Section A (Growth & Measurement) and Section B (Poverty, Inequality & Institutions). Attempt any 3 questions from each section. Each question carries 10 marks.",
    questions: [
      {
        qNum: 1,
        marks: 10,
        section: "Section A",
        text: "Critically evaluate Denis Goulet's three core values of development and Amartya Sen's capability approach. How does the 'Bangladesh Development Surprise' challenge traditional output-centric growth paradigms?",
        linkedQuestionId: "q-ch1-2m"
      },
      {
        qNum: 2,
        marks: 10,
        section: "Section A",
        text: "Deconstruct the mathematical derivation of the Harrod-Domar growth model ($g = s / c$). Explain the economic meaning of ICOR and discuss how financing gaps are handled in developing economies.",
        linkedQuestionId: "q-ch3-2m"
      },
      {
        qNum: 3,
        marks: 10,
        section: "Section A",
        text: "Explain the mathematical construction of the Human Development Index (HDI). Why was the geometric mean introduced in 2010, and what are the key features of the Inequality-adjusted HDI (IHDI)?",
        linkedQuestionId: "q-ch4-2m"
      },
      {
        qNum: 4,
        marks: 10,
        section: "Section B",
        text: "Compare Import-Substitution Industrialization (ISI) and Export-Promotion Industrialization (EPI). What lessons does the East Asian Tiger experience offer for Bangladesh's post-LDC graduation trade policy?",
        linkedQuestionId: "q-ch5-5m"
      },
      {
        qNum: 5,
        marks: 10,
        section: "Section B",
        text: "Explain the Cost of Basic Needs (CBN) method utilized by the Bangladesh Bureau of Statistics (BBS) to establish lower and upper poverty lines. Contrast Headcount ($P_0$), Poverty Gap ($P_1$), and Severity ($P_2$).",
        linkedQuestionId: "q-ch6-10m"
      },
      {
        qNum: 6,
        marks: 10,
        section: "Section B",
        text: "How do transaction costs and secure property rights condition long-term capital formation? Critically analyze Acemoglu and Robinson's inclusive vs. extractive institutions thesis.",
        linkedQuestionId: "q-ch8-2m"
      }
    ]
  }
];
