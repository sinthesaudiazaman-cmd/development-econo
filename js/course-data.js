// Development Economics (Course Code: 0388 21 DS 2201)
// Complete Course Contents, Textbook Explanations, Handnotes, Videos & Readings

const COURSE_META = {
  code: "0388 21 DS 2201",
  title: "Development Economics",
  term: "Second Year Second Term",
  status: "Core Course",
  credit: 3.0,
  prerequisite: "None",
  rationale: "The course intends to provide the students with the understanding of the concept of economic development, its measurement and a wide array of explanations and mechanisms and factors that condition the development of a country. The course also includes essentials on poverty and inequality. It is expected that with these understandings students will be able to apply the knowledge in designing appropriate intervention strategies while working with the communities and societies.",
  clos: [
    { id: "CLO 1", description: "Understand and articulate core concepts of economic growth, developmental definitions, industrialization models, and national accounting." },
    { id: "CLO 2", description: "Analyze classical, neoclassical, and endogenous growth models, and evaluate poverty indices and empirical diagnostics." },
    { id: "CLO 3", description: "Critique human development dimensions, HDI metrics, inequality indices (Lorenz/Gini), and Kuznetsian dynamics." },
    { id: "CLO 4", description: "Deconstruct institutional evolution, property rights, transaction costs, and inclusive vs extractive governance regimes." }
  ]
};

const CHAPTERS_DATA = [
  // SECTION A
  {
    id: "ch-1",
    number: 1,
    section: "Section A",
    title: "Introducing Development Economics",
    clo: "CLO 1",
    subtitle: "Meaning of Development, Historical Background, Growth Components, and Growth vs. Development",
    overview: "This foundational chapter establishes the distinction between quantitative economic growth and qualitative human development. It tracks the post-WWII evolution of development economics from capital-fundamentalism to multidimensional capabilities.",
    handnotes: [
      "Economic Growth: A sustained increase in a country's productive capacity, quantified by real Gross Domestic Product (GDP) or Gross National Income (GNI) per capita over time.",
      "Economic Development: A multidimensional process involving structural transformation, eradication of absolute poverty, reduction of inequality, and expansion of human capabilities (Amartya Sen).",
      "Goulet's Three Core Values of Development: 1) Life Sustenance (basic needs), 2) Self-Esteem (sense of worth/dignity), 3) Freedom from Servitude (expanded range of choice).",
      "Amartya Sen's Capability Approach: Development is the expansion of substantive freedoms. Functionings are 'beings and doings' (e.g., being nourished, healthy). Capabilities are the freedom to achieve valuable combinations of functionings.",
      "Growth Components: 1) Capital Accumulation (infrastructure, machinery), 2) Labor Force Growth (quantity + demographic dividend), 3) Technological Progress (neutral, labor-saving, or capital-saving)."
    ],
    videos: [
      {
        title: "Economic Growth vs. Economic Development",
        channel: "MRUniversity (Marginal Revolution)",
        youtubeId: "2tqU_uU8ZcE",
        duration: "8 mins",
        description: "Clear conceptual differentiation between GDP expansion and multidimensional living standard enhancement."
      },
      {
        title: "Amartya Sen's Capability Approach to Development",
        channel: "Poliscics & Oxford OPHI",
        youtubeId: "j6fK7E_j8bY",
        duration: "14 mins",
        description: "In-depth breakdown of functionings, capabilities, commodities, and human freedom."
      },
      {
        title: "Development Economics: An Overview",
        channel: "MIT OpenCourseWare (14.771)",
        youtubeId: "vB36Cg2h_48",
        duration: "45 mins",
        description: "Lecture on the historical evolution and foundational questions of development economics."
      }
    ],
    readings: [
      "Todaro, M. P., & Smith, S. C. - Economic Development (13th Edition), Chapter 1: 'Introducing Economic Development: A Global Perspective'.",
      "Sen, Amartya (1999) - 'Development as Freedom', Oxford University Press, Chapters 1 & 2.",
      "Goulet, Denis (1971) - 'The Cruel Choice: A New Concept in the Theory of Development'."
    ],
    topics: [
      {
        id: "ch1-t1",
        name: "Meaning of Development and Economic Development",
        content: `
### 1. The Semantic and Theoretical Evolution of 'Development'
Historically, the study of economic development was dominated by early post-World War II economists who viewed development almost synonymously with industrialization and the rapid accumulation of physical capital. During the 1950s and 1960s, a country was deemed 'developing' if its annual output of goods and services (measured by Gross National Product) grew at an annual rate between 5% and 7%.

However, the experience of the 1960s and 1970s exposed deep flaws in this output-centric paradigm. Multiple Third World nations registered impressive rates of economic growth, yet the standard of living for the broad majority of their populations remained stagnant or deteriorated. Mass unemployment widened, income inequality surged, and absolute poverty showed no signs of receding.

This led to a radical redefinition of economic development:
* **Traditional Economic View:** Development as sustained growth in per capita real income accompanied by changes in the structure of production (shift from agriculture to manufacturing and services).
* **Modern Multidimensional View:** Development must be conceived as a multidimensional process involving major changes in social structures, popular attitudes, and national institutions, as well as the acceleration of economic growth, the reduction of inequality, and the eradication of poverty.

### 2. Denis Goulet's Three Core Values of Development
Denis Goulet (1971) argued that development is an ethical and value-laden concept grounded in three core values:
1. **Life-Sustenance (The Ability to Provide Basic Needs):** All people have certain basic needs without which life is impossible: food, shelter, health, and protection. When any of these is in critically short supply, a state of absolute 'underdevelopment' exists.
2. **Self-Esteem (To Be a Person of Worth):** A second universal component of the good life is self-esteem—a sense of worth, identity, dignity, and self-respect. Underdevelopment breeds feelings of inferiority in societies dominated by external powers.
3. **Freedom from Servitude (To Be Able to Choose):** Freedom here refers to freedom from the alienating material conditions of life and from social servitude to nature, ignorance, other people, misery, and dogmatic beliefs. It expands the range of human choice.
        `
      },
      {
        id: "ch1-t2",
        name: "Historical Background: From Post-Colonial Reconstruction to Modern Paradigm",
        content: `
### The Genesis of Development Economics
Development economics emerged as an explicit sub-discipline of economics only after 1945. Four historical milestones catalyzed this development:
1. **Decolonization:** Between 1945 and 1965, dozens of colonized nations in Asia and Africa (including India, Pakistan/Bangladesh, Indonesia, Ghana) attained political sovereignty. Newly minted independent governments faced the immediate imperative of delivering economic progress to avoid political instability.
2. **The Cold War & Geopolitical Rivalry:** The ideological contest between Western capitalism and Soviet central planning turned the developing world into an economic battleground. The United States and its allies utilized foreign aid (Point Four Program) and academic research to demonstrate that market capitalism could foster prosperity.
3. **The Marshall Plan Success:** The rapid reconstruction of Western Europe through massive injections of American capital led early theorists to conclude that developing nations suffered merely from a capital shortage.
4. **The Recognition of Market Failures:** Pioneers such as Paul Rosenstein-Rodan, Ragnar Nurkse, and W. Arthur Lewis observed that developing nations possessed structural rigidities, imperfect markets, and surplus labor, necessitating specialized developmental theory beyond standard neoclassical equilibrium.
        `
      },
      {
        id: "ch1-t3",
        name: "Components of Economic Growth",
        content: `
### The Three Fundamental Drivers of Economic Growth
In classical and neoclassical growth literature, economic growth is determined by three core components:

1. **Capital Accumulation:**
   Capital accumulation occurs when some proportion of current national income is saved and invested in order to augment future output. It encompasses investments in new land, physical equipment, infrastructure (roads, deep-sea ports, electricity grids, fiber optic cables), and human capital (investments in health, schooling, and technical skills).

2. **Growth in Population and the Labor Force:**
   A larger labor force increases the potential productive capacity of an economy. However, the economic impact depends critically on the **dependency ratio** and whether the economy can productively absorb labor. The *Demographic Dividend* occurs when falling fertility rates expand the working-age population relative to dependents—a critical phase Bangladesh has traversed over the last two decades.

3. **Technological Progress:**
   Technological progress results from new ways of accomplishing traditional tasks. In growth theory, technological progress is categorized into three types:
   * **Neutral Technological Progress:** Higher output is attained with the same quantity and proportions of factor inputs (Hicks-neutral).
   * **Labor-Saving Technological Progress:** Advances that achieve higher output with fewer laborers (e.g., automation, robotics, automated garment sewing machines).
   * **Capital-Saving Technological Progress:** Advances that achieve higher output with lower capital intensity (e.g., low-cost solar home systems, open-source agricultural apps for rural farmers).
        `
      },
      {
        id: "ch1-t4",
        name: "Economic Growth vs. Economic Development: Comparative Analysis",
        content: `
### Comprehensive Comparative Matrix

| Dimension | Economic Growth | Economic Development |
| :--- | :--- | :--- |
| **Definition** | Quantitative expansion in an economy's total output (Real GDP / GNI per capita) | Multidimensional qualitative transformation of economic, institutional, and social structures |
| **Nature of Metric** | Unidimensional, single-variable quantitative measure ($) | Multidimensional (incorporates health, education, inequality, poverty, empowerment) |
| **Scope** | Confined strictly to economic output and market transactions | Encompasses economic, institutional, social, and political freedoms |
| **Measurement Tools** | Real GDP, GNI per capita, Growth Rate (%) | Human Development Index (HDI), Multidimensional Poverty Index (MPI), Gini Coefficient |
| **Prerequisites** | Capital accumulation, labor supply, technological inputs | Growth plus progressive institutional distribution, basic healthcare, universal education |
| **Reversibility** | Highly vulnerable to short-run recessions, external demand shocks, inflation | Structural development (e.g., eradicated illiteracy, institutional rule of law) is enduring |

### Amartya Sen's Capability Approach
Nobel Laureate Amartya Sen revolutionized this debate by stating: *"Economic growth is a means to an end, never an end in itself."*
* **Functionings:** The states of 'being' and 'doing' that a person has reason to value (e.g., being well-nourished, having shelter, being respected, avoiding preventable morbidity).
* **Capabilities:** The substantive freedoms a person possesses to choose among alternative functioning bundles.
* **Commodities as Means:** Commodities (goods/income) are merely tools that possess characteristics. Whether an individual can convert commodities into functionings depends on personal conversion factors (e.g., metabolism, physical handicap), social factors (caste, gender norms), and environmental factors.

**Empirical Case in Point (Bangladesh):**
Between 1990 and 2020, Bangladesh demonstrated higher improvements in social indicators (infant mortality reduction, life expectancy increase, female secondary enrollment parity) than India or Pakistan, even during phases when its per capita GDP growth was lower. This historic divergence is termed the **"Bangladesh Development Surprise"** (Asadullah et al., 2014; Dreze & Sen, 2013).
        `
      }
    ]
  },

  // CHAPTER 2
  {
    id: "ch-2",
    number: 2,
    section: "Section A",
    title: "Measuring Development",
    clo: "CLO 1",
    subtitle: "GDP, GNP/GNI, Measuring Income, Per Capita Income, and Purchasing Power Parity (PPP)",
    overview: "This chapter interrogates the metrics of macroeconomic accounting, highlighting the structural distinctions between domestic production and national income, along with the price distortions resolved by Purchasing Power Parity.",
    handnotes: [
      "Gross Domestic Product (GDP): Total monetary value of all final goods and services produced within a country's geographical borders during a given period.",
      "Gross National Product (GNP / GNI): GDP + Net Factor Income from Abroad (NFIA). Crucial for Bangladesh due to $20B+ annual wage earner remittances.",
      "Per Capita Income (PCI): Total National Income divided by Total Population. Major flaw: It masks acute income inequality (billionaires vs ultra-poor).",
      "Purchasing Power Parity (PPP): An exchange rate metric calculated by equalizing the price of an identical basket of goods across two currencies (Law of One Price).",
      "Balassa-Samuelson Effect: Non-tradable goods (services, haircuts, local produce) are significantly cheaper in developing nations due to lower wages, meaning nominal exchange rates grossly underestimate the real domestic purchasing power of developing economies."
    ],
    videos: [
      {
        title: "Purchasing Power Parity (PPP) Explained",
        channel: "MRUniversity",
        youtubeId: "vBq7_0g_g70",
        duration: "6 mins",
        description: "How PPP adjusts for price level disparities between developing and developed countries."
      },
      {
        title: "GDP vs GNP / GNI: Why Remittances Change Everything",
        channel: "EconplusDal",
        youtubeId: "bO1a0M5dKQE",
        duration: "10 mins",
        description: "Clear mathematical differentiation between domestic boundaries and domestic national ownership."
      }
    ],
    readings: [
      "World Bank (2020) - 'Purchasing Power Parities and the Size of World Economies: Results from the 2017 ICP'.",
      "Todaro & Smith - Chapter 2: 'Comparative Economic Development'."
    ],
    topics: [
      {
        id: "ch2-t1",
        name: "Gross Domestic Product (GDP) and Gross National Product (GNP/GNI)",
        content: `
### Defining the Accounting Metrics
National income accounting provides the quantitative architecture for macroeconomic analysis.

#### Gross Domestic Product (GDP)
GDP measures the total market value of all final goods and services produced within the territorial boundaries of a country during a specified period (typically one fiscal year).
$$\\text{GDP} = C + I + G + (X - M)$$
* $C$: Private household consumption.
* $I$: Gross private domestic investment.
* $G$: Government consumption expenditure and investment.
* $(X - M)$: Net exports (Exports minus Imports).

#### Gross National Income (GNI) / Gross National Product (GNP)
GNI measures the total income earned by domestic residents of a nation, regardless of the geographic location of production factors.
$$\\text{GNI} = \\text{GDP} + \\text{NFIA}$$
Where $\\text{NFIA}$ is **Net Factor Income from Abroad**:
$$\\text{NFIA} = \\text{Factor Income Received by Residents from Overseas} - \\text{Factor Income Paid to Foreign Residents Domestically}$$

**Crucial Relevance for Bangladesh:**
In developing countries with large diaspora populations working abroad—such as Bangladesh with 10+ million migrant workers in the Gulf, Southeast Asia, and Europe—GNI is systematically larger than GDP because of substantial remittance inflows (often 6% to 8% of GDP). Conversely, in countries with heavy foreign-owned resource extraction (e.g., copper mines in Zambia), GDP substantially exceeds GNI because profits are repatriated overseas.
        `
      },
      {
        id: "ch2-t2",
        name: "Measuring Income: Nominal vs. Real and Per Capita Distortions",
        content: `
### Nominal vs. Real Income
* **Nominal GDP:** Evaluates output at current prevailing market prices. It can rise purely due to inflationary price hikes without any actual increase in physical output.
* **Real GDP:** Evaluates output at constant base-year prices, adjusting for inflation via the GDP Deflator:
$$\\text{Real GDP} = \\frac{\\text{Nominal GDP}}{\\text{GDP Deflator}} \\times 100$$

### The Per Capita Metric and Its Critical Shortcomings
$$\\text{Per Capita Income (PCI)} = \\frac{\\text{Total National Income}}{\\text{Total Population}}$$

While PCI provides a standard benchmark for international rankings (e.g., World Bank income classification: Low, Lower-Middle, Upper-Middle, High Income), it possesses acute analytical limitations:
1. **Blindness to Income Distribution:** A country with 1 oligarch owning 90% of wealth and 99% living in extreme poverty can report the exact same PCI as an egalitarian society.
2. **Exclusion of the Non-Monetized Informal Economy:** In rural agrarian areas and urban informal sectors (e.g., rickshaw pullers, street vendors in Dhaka/Khulna), massive economic exchanges occur without formal documentation.
3. **Unpaid Reproductive and Care Work:** Domestic care work, overwhelmingly undertaken by women, is entirely excluded from national accounts.
4. **Disregard for Environmental Depletion:** Strip-mining, deforestation, and river pollution are recorded as positive additions to GDP without deducting the depreciation of natural capital.
        `
      },
      {
        id: "ch2-t3",
        name: "Purchasing Power Parity (PPP): Theory and Applications",
        content: `
### The Law of One Price and Exchange Rate Distortions
When comparing income levels across countries, converting domestic currencies into US Dollars using official market exchange rates yields severe distortions. Market exchange rates are governed exclusively by **tradable goods, capital flows, foreign exchange speculation, and interest rate differentials**.

However, a large proportion of goods consumed in developing nations consists of **non-tradable goods and services** (e.g., haircuts, residential rent, local street food, healthcare visits). Because wages are low in developing economies, the prices of these non-tradables are dramatically lower than in advanced economies.

### The Balassa-Samuelson Effect
1. Rich nations possess high labor productivity in tradable manufacturing sectors, which drives up national wage rates across the entire economy.
2. High wages in rich nations spill over into non-tradable service sectors, making services expensive.
3. In developing nations, lower productivity in tradables keeps overall wages lower, keeping services cheap.
4. Consequently, converting a Bangladeshi worker's Taka income at market exchange rates artificially understates their actual purchasing power.

### The PPP Adjustment
Purchasing Power Parity calculates an artificial exchange rate based on the relative cost of a standard comprehensive basket of consumer goods:
$$\\text{PPP Exchange Rate} = \\frac{P_{\\text{domestic}}}{P_{\\text{foreign}}}$$

**Empirical Reality for Bangladesh:**
* Bangladesh Nominal GNI Per Capita: $\\approx \\$2,800$ USD.
* Bangladesh PPP GNI Per Capita: $\\approx \\$8,500$ to $\\$9,000$ Current International Dollars.
* The PPP figure is roughly 3 times larger than the nominal figure, accurately capturing the domestic purchasing power of the population.
        `
      }
    ]
  },

  // CHAPTER 3
  {
    id: "ch-3",
    number: 3,
    section: "Section A",
    title: "Classical, Neoclassical & Modern Growth Theories",
    clo: "CLO 2, 3",
    subtitle: "Smith, Ricardo, Marx, Schumpeter, Keynes, Rostow, Balanced/Unbalanced, Big Push, Harrod-Domar, Solow & Endogenous Growth",
    overview: "The most theoretical chapter of the curriculum. It investigates historical growth doctrines, mathematical growth formulations (Harrod-Domar, Solow-Swan), structural coordination failures (Big Push), and modern endogenous growth mechanisms (Romer, Lucas).",
    handnotes: [
      "Adam Smith: Division of labor is limited by the extent of the market. Capital accumulation drives employment.",
      "David Ricardo: Diminishing returns in agriculture lead to rising grain prices, higher subsistence wages, declining industrial profits, and the inevitable 'Stationary State'. Free trade (Repeal of Corn Laws) postpones this.",
      "Karl Marx: Capitalism generates surplus value ($s = v + c$). The rising Organic Composition of Capital ($c/v$) leads to the Falling Rate of Profit and systemic crises.",
      "Joseph Schumpeter: Economic development is dynamic disruption ('Creative Destruction') driven by the innovative entrepreneur funded by bank credit.",
      "Rostow's 5 Stages: Traditional Society -> Preconditions for Take-off -> Take-off -> Drive to Maturity -> Age of High Mass Consumption.",
      "Balanced Growth (Nurkse, Rosenstein-Rodan): Simultaneous investment across complementary consumer industries to enlarge mutual market size.",
      "Unbalanced Growth (Albert Hirschman): Deliberate unbalancing by investing in sectors with strong Backward and Forward Linkages.",
      "Harrod-Domar Growth Model: $g = s / c$ or $g = s / \\text{ICOR}$. Growth equals savings rate divided by capital-output ratio. Knife-edge equilibrium.",
      "Solow-Swan Exogenous Growth: Diminishing returns to capital implies capital deepening cannot sustain long-run growth; sustained growth requires exogenous technological progress ($A$). Predicts convergence.",
      "Endogenous Growth (Romer, Lucas): Long-run growth is driven endogenously by human capital, knowledge spillover, and non-rival ideas without diminishing returns."
    ],
    videos: [
      {
        title: "The Solow Growth Model (Step-by-Step)",
        channel: "MRUniversity",
        youtubeId: "5F_pPqE3uOQ",
        duration: "12 mins",
        description: "Visualizing capital accumulation, depreciation, steady-state $k^*$, and technological shifts."
      },
      {
        title: "Harrod-Domar Growth Model Explained with Derivation",
        channel: "EconplusDal",
        youtubeId: "mX4L0N9ZzD0",
        duration: "11 mins",
        description: "Mathematical derivation of $g = s / c$, ICOR, and the financing gap approach."
      },
      {
        title: "Romer & Lucas Endogenous Growth Theory",
        channel: "MRUniversity",
        youtubeId: "3vV0uO1dK9E",
        duration: "14 mins",
        description: "Why ideas are non-rival and create increasing returns to scale."
      }
    ],
    readings: [
      "Ray, Debraj (1998) - 'Development Economics', Princeton University Press, Chapters 3 & 4.",
      "Solow, Robert M. (1956) - 'A Contribution to the Theory of Economic Growth', Quarterly Journal of Economics.",
      "Romer, Paul M. (1990) - 'Endogenous Technological Change', Journal of Political Economy."
    ],
    topics: [
      {
        id: "ch3-t1",
        name: "Classical Growth Doctrines: Adam Smith, David Ricardo, and Karl Marx",
        content: `
### 1. Adam Smith (1776): Division of Labor and Capital Accumulation
Adam Smith laid the foundations of growth theory in *The Wealth of Nations*:
* **Division of Labor:** Specialization enhances worker dexterity, eliminates transition time between tasks, and encourages mechanical innovation (pin factory example).
* **The Extent of the Market:** Specialization is constrained by market size. Infrastructure, urban density, and international free trade expand market boundaries, deepening the division of labor.
* **Capital Accumulation as the Engine:** Capitalists reinvest surplus profits into productive labor, expanding output in a virtuous cycle until resource constraints emerge.

### 2. David Ricardo (1817): Agriculture, Diminishing Returns, and the Stationary State
Ricardo introduced a rigorous analytical model based on three classes: Landlords (Rent), Capitalists (Profit), and Workers (Subsistence Wage).
* **Mechanism:** As population grows, lower-quality, less fertile land must be cultivated.
* Due to **diminishing marginal returns in agriculture**, the marginal cost of producing food (corn) rises.
* Food prices rise $\\implies$ Nominal subsistence wages must rise to keep workers alive $\\implies$ Landlords extract higher differential rents.
* **Profit Squeeze:** Industrial capitalists' profits are squeezed between rising rents and rising nominal wages.
* When profits drop to zero, net investment ceases, and the economy stagnates into the **Stationary State**.
* *Ricardo's Solution:* Free international grain trade (Repeal of the Corn Laws) to import cheap food and preserve industrial profits.

### 3. Karl Marx (1867): Surplus Value and the Inherent Crises of Capitalism
* **Surplus Value ($s$):** Capitalists extract unpaid labor from the working class (proletariat).
* Total Value of Output = $c + v + s$, where $c$ is constant capital (machinery/raw materials), $v$ is variable capital (wages), and $s$ is surplus value.
* **Organic Composition of Capital ($c/v$):** Fierce inter-capitalist competition forces firms to substitute machinery for human labor, raising $c/v$.
* **Rate of Profit:** $r = \\frac{s}{c + v} = \\frac{s/v}{(c/v) + 1}$. As $c/v$ rises faster than the rate of exploitation ($s/v$), the **Rate of Profit Tendentially Falls**.
* The displaced workers form the **Industrial Reserve Army of Labor**, driving underconsumption and leading to systemic capitalist crises.
        `
      },
      {
        id: "ch3-t2",
        name: "Schumpeter, Keynes, and Rostow's Stages of Growth",
        content: `
### 1. Joseph Schumpeter (1911): The Entrepreneur and Creative Destruction
Schumpeter broke away from static equilibrium:
* **Circular Flow:** The economy operates in an unvarying routine until an **Entrepreneur** introduces an innovation.
* **Five Types of Innovation:** 1) Introduction of a new good, 2) New production method, 3) Opening of a new market, 4) Conquest of a new supply of raw materials, 5) New industrial organization (e.g., breaking a monopoly).
* **Bank Credit:** Innovation requires purchasing power creation by banking institutions.
* **Creative Destruction:** Waves of innovation destroy obsolete firms, driving business cycles and dynamic development.

### 2. John Maynard Keynes: Effective Demand and Underemployment
Keynes demonstrated that free-market economies can get trapped in an underemployment equilibrium due to deficient **Effective Demand** ($AD = C + I + G + NX$).
* In developing economies, low private investment cannot be automatically cured by wage cuts. Active state capital expenditure is required to crowd-in private investment.

### 3. W.W. Rostow's Linear Stages of Economic Growth (1960)
Rostow proposed that all societies pass through five sequential stages:
1. **The Traditional Society:** Pre-Newtonian science, limited production functions, ceiling on output, agrarian dominance.
2. **Preconditions for Take-Off:** Insights of modern science applied; building of social overhead capital (transport, ports); emergence of an entrepreneurial elite.
3. **The Take-Off:** The watershed stage! Lasts 2-3 decades. Investment rate jumps from 5% to >10% of national income. Rapid manufacturing expansion; institutional modernization.
4. **The Drive to Maturity:** Modern technology spreads across all economic activities; import-substitution gives way to international specialization.
5. **The Age of High Mass Consumption:** Shift toward consumer durables and social welfare services.
* *Critique:* Assumes a linear, teleological Western path; ignores historical structural dependency, colonialism, and international power asymmetries.
        `
      },
      {
        id: "ch3-t3",
        name: "Balanced vs. Unbalanced Growth and Rosenstein-Rodan's Big Push Theory",
        content: `
### Balanced Growth Theory (Ragnar Nurkse & Paul Rosenstein-Rodan)
* **The Problem:** The "Vicious Circle of Poverty". On the demand side, small domestic market size discourages industrial investment. On the supply side, low income yields low savings.
* **The Solution:** A synchronized, wide-ranging program of capital investment across multiple complementary consumer-goods manufacturing industries.
* **Say's Law Applied Broadly:** Workers employed in shoe factories purchase cloth; cloth workers purchase shoes; the mutual expansion creates its own demand.

### Rosenstein-Rodan's 'Big Push' Model (1943)
* Individual industrialization is constrained by coordination failures.
* A single firm adopting modern mass-production technology must pay workers a wage premium over traditional agriculture. If only one firm industrializes, workers will spend only a fraction of their wages on that firm's output, rendering the firm unprofitable.
* **Externalities:** Simultaneous investments generate pecuniary externalities and market size effects. Only a coordinated, simultaneous state-led **"Big Push"** can leap over the threshold from backwardness to industrialization.

### Unbalanced Growth Theory (Albert Hirschman, 1958)
* Hirschman argued that developing countries suffer not from a lack of potential investment projects, but from a critical shortage of **decision-making ability and entrepreneurial initiative**.
* A balanced push across all sectors is unrealistic because administrative and financial resources are scarce.
* **The Strategy:** Deliberately unbalance the economy by investing in strategic sectors with high **Linkage Effects**:
  * **Backward Linkages:** Demand created by a sector for intermediate inputs produced by domestic supplier industries (e.g., steel manufacturing requires coal and iron ore).
  * **Forward Linkages:** An industry outputs goods that become raw materials for downstream industries (e.g., petrochemicals enabling plastics, textiles, packaging).
        `
      },
      {
        id: "ch3-t4",
        name: "The Harrod-Domar Growth Model",
        content: `
### Mathematical Derivation of the Harrod-Domar Model
Formulated independently by Roy Harrod (1939) and Evsey Domar (1946).

Let Aggregate Output be $Y$, Savings be $S$, Investment be $I$, and Capital Stock be $K$.
1. **Savings Function:** Aggregate national savings is a constant fraction $s$ of national income:
$$S = sY$$
2. **Investment Identity:** In equilibrium, total investment equals total savings:
$$I = S = sY$$
3. **Capital-Output Ratio ($c$ or $\\text{ICOR}$):** The amount of additional capital required to produce one additional unit of output:
$$c = \\frac{\\Delta K}{\\Delta Y} = \\text{ICOR}$$
4. Since Net Investment $\\Delta K = I$, we can substitute $I$:
$$c = \\frac{I}{\\Delta Y} \\implies I = c \\cdot \\Delta Y$$
5. Equating the two investment expressions:
$$sY = c \\cdot \\Delta Y$$
6. Dividing both sides by $Y$ and $c$:
$$\\frac{\\Delta Y}{Y} = \\frac{s}{c}$$
Where $g = \\frac{\\Delta Y}{Y}$ is the **Rate of Economic Growth**.
$$g = \\frac{s}{\\text{ICOR}}$$

### Analytical Implications and "Financing Gap"
* To accelerate economic growth, a developing nation must either:
  1. Increase its national savings rate $s$ (via tax mobilization, microfinance, banking).
  2. Lower its $\\text{ICOR}$ ($c$), meaning capital is used more productively.
* **The Financing Gap Approach:** If a developing country wants to grow at 7% per year, and its $\\text{ICOR}$ is 3.5, it requires an investment rate of $s = g \\times c = 7 \\times 3.5 = 24.5\\%$. If domestic savings is only $14.5\\%$, a **Financing Gap of 10%** exists, which must be filled by foreign aid, loans, or Foreign Direct Investment (FDI).
* *Limitation:* Assumes fixed factor proportions (L-shaped isoquants) with zero substitutability between labor and capital; ignores institutions, human capital, and total factor productivity.
        `
      },
      {
        id: "ch3-t5",
        name: "Neoclassical (Solow-Swan) vs. Endogenous Growth Theories",
        content: `
### 1. The Solow-Swan Neoclassical Growth Model (1956)
Robert Solow resolved Harrod-Domar's knife-edge instability by introducing flexible factor substitution and diminishing marginal returns to capital.

#### Aggregate Production Function:
$$Y = A \\cdot F(K, L) = A K^\\alpha L^{1-\\alpha} \\quad (0 < \\alpha < 1)$$
Expressing in intensive (per worker) terms where $y = Y/L$ and $k = K/L$:
$$y = A k^\\alpha$$

#### Fundamental Differential Equation of Capital Accumulation:
$$\\dot{k} = s \\cdot y - (n + \\delta) k = s A k^\\alpha - (n + \\delta) k$$
* $s$: Savings rate
* $n$: Population growth rate
* $\\delta$: Capital depreciation rate

#### Steady-State Equilibrium ($k^*$):
At steady state, investment exactly covers depreciation and population dilution: $\\dot{k} = 0$.
$$s A (k^*)^\\alpha = (n + \\delta) k^* \\implies k^* = \\left( \\frac{s A}{n + \\delta} \\right)^{\\frac{1}{1-\\alpha}}$$
**Key Solow Conclusions:**
1. **No Long-Run Per Capita Growth from Capital Accumulation:** In the steady state, output per worker ($y^*$) is static. An increase in savings rate $s$ causes only a temporary **level effect**, not a permanent **growth effect**.
2. **Exogenous Technological Progress:** Long-run sustained per capita growth can occur **only** via exogenous technological advancement ($A$).
3. **Convergence Hypothesis:** Poor countries with low capital-labor ratios ($k$) have higher marginal returns to capital than rich countries; hence, poor nations should grow faster and converge to rich country income levels (**Catch-Up Growth**).

### 2. Endogenous Growth Theory (Romer 1986/1990; Lucas 1988)
Neoclassical theory left the primary driver of growth—technology ($A$)—as an unexplained "exogenous residual" falling from the sky. Endogenous growth theorists sought to explain technology within the economic model.

* **Paul Romer's Knowledge Model:** Knowledge and ideas are **non-rival goods**. Once a software code, medical formula, or chemical process is created, it can be utilized simultaneously by infinite producers at zero marginal cost.
* **Positive Externalities and Knowledge Spillovers:** Individual firm investments in research and development create collective spillovers, generating **constant or increasing returns to scale** at the aggregate macroeconomic level.
* **Robert Lucas's Human Capital Model:** Investments in schooling, technical training, and health enhance human capital ($h$), offsetting the diminishing marginal returns to physical capital.
* **Policy Implication:** Long-run growth rates are permanently elevated by government policies that subsidize R&D, protect intellectual property, fund technical education, and open markets to international technology transfers.
        `
      }
    ]
  },

  // CHAPTER 4
  {
    id: "ch-4",
    number: 4,
    section: "Section A",
    title: "Human Development",
    clo: "CLO 3",
    subtitle: "Meaning, Measurement, Policies, Human Capital Formulation, HDI Methodology, and HDR Family",
    overview: "This chapter examines the paradigm conceptualized by Mahbub ul Haq and Amartya Sen. It covers the exact mathematical derivation of the Human Development Index (HDI) and the broader family of HDR indices.",
    handnotes: [
      "Human Development Paradigm: Putting people at the center of development. Human beings are the primary ends of development, not merely tools of production.",
      "Human Capital vs Human Development: Human Capital (Schultz, Becker) treats education/health as inputs to enhance economic productivity. Human Development treats education/health as inherently valuable ends in themselves.",
      "HDI Three Dimensions: 1) Long and healthy life (Life Expectancy at birth), 2) Knowledge (Expected & Mean Years of Schooling), 3) Decent standard of living (GNI per capita PPP $).",
      "HDI Mathematical Aggregation: Uses Geometric Mean: $\\text{HDI} = (I_{\\text{Health}} \\times I_{\\text{Education}} \\times I_{\\text{Income}})^{1/3}$. Replaced arithmetic mean in 2010 to penalize low performance in any single dimension (imperfect substitutability).",
      "HDR Family: Inequality-adjusted HDI (IHDI), Gender Development Index (GDI), Gender Inequality Index (GII), Multidimensional Poverty Index (MPI)."
    ],
    videos: [
      {
        title: "How to Calculate the Human Development Index (HDI)",
        channel: "UNDP / Economics Explained",
        youtubeId: "vBfP1p6mKxE",
        duration: "10 mins",
        description: "Step-by-step breakdown of dimension goalposts, indices, and the geometric mean."
      },
      {
        title: "Mahbub ul Haq and the Story of the Human Development Index",
        channel: "UNDP Human Development Report",
        youtubeId: "8x8X9QoW1s4",
        duration: "7 mins",
        description: "The historical struggle to challenge GDP supremacy in the 1990 UN Human Development Report."
      }
    ],
    readings: [
      "UNDP (2020) - 'Human Development Report: Technical Notes on Calculating the HDI'.",
      "Sen, Amartya (2000) - 'A Decade of Human Development', Journal of Human Development.",
      "Todaro & Smith - Chapter 8: 'Human Capital: Education and Health in Economic Development'."
    ],
    topics: [
      {
        id: "ch4-t1",
        name: "Concept of Human Development & Human Capital Formulation",
        content: `
### 1. Conceptual Genesis
In 1990, Pakistani economist Dr. Mahbub ul Haq, in close partnership with Amartya Sen, launched the inaugural United Nations Development Programme (UNDP) **Human Development Report (HDR)** with the seminal statement:
> *"People are the real wealth of nations. The basic objective of development is to create an enabling environment for people to enjoy long, healthy and creative lives."*

### 2. Human Capital vs. Human Development
It is vital to distinguish between these two related but fundamentally distinct concepts:
* **Human Capital Formulation (Theodore Schultz, Gary Becker):**
  Human beings are viewed as factors of production. Investment in education, vocational training, nutrition, and medical care is justified because it improves the productivity and economic output of labor. The return on investment is measured in future earnings and higher GDP.
* **Human Development Approach (Sen, Haq):**
  Health, knowledge, and freedom are intrinsically valuable, regardless of whether they increase monetary output. A literate person who can read literature, participate in civic elections, and avoid preventable diseases has attained a higher state of being, even if their market wage does not change.
        `
      },
      {
        id: "ch4-t2",
        name: "Human Development Index (HDI) Mathematical Methodology",
        content: `
### The Mathematical Construction of HDI
The HDI synthesizes three core dimensions of human capability:

#### 1. Dimension Goalposts (UNDP Standard):
* **Health:** Life Expectancy at Birth (Min: 20 years, Max: 85 years)
* **Education:**
  * Mean Years of Schooling for adults aged 25+ (Min: 0, Max: 15 years)
  * Expected Years of Schooling for school-age children (Min: 0, Max: 18 years)
* **Standard of Living:** GNI per capita in 2017 PPP US$ (Min: $\\$100$, Max: $\\$75,000$)

#### 2. Dimension Index Formula:
$$\\text{Dimension Index} = \\frac{\\text{Actual Value} - \\text{Minimum Value}}{\\text{Maximum Value} - \\text{Minimum Value}}$$

* **Health Index ($I_{\\text{Health}}$):**
$$I_{\\text{Health}} = \\frac{\\text{Life Expectancy} - 20}{85 - 20}$$

* **Education Index ($I_{\\text{Education}}$):**
$$I_{\\text{MYS}} = \\frac{\\text{Mean Years} - 0}{15 - 0}, \\quad I_{\\text{EYS}} = \\frac{\\text{Expected Years} - 0}{18 - 0}$$
$$I_{\\text{Education}} = \\frac{I_{\\text{MYS}} + I_{\\text{EYS}}}{2}$$

* **Income Index ($I_{\\text{Income}}$):**
Because the marginal utility of income diminishes as income grows, income is converted using a natural logarithmic scale:
$$I_{\\text{Income}} = \\frac{\\ln(\\text{GNIpc}) - \\ln(100)}{\\ln(75,000) - \\ln(100)}$$

#### 3. Geometric Mean Aggregation:
Prior to 2010, the UNDP used an arithmetic average $\\frac{I_H + I_E + I_I}{3}$. This had a major flaw: a high income could perfectly compensate for poor health or low schooling. In 2010, the UNDP shifted to the **Geometric Mean**:
$$\\text{HDI} = \\left( I_{\\text{Health}} \\times I_{\\text{Education}} \\times I_{\\text{Income}} \\right)^{\\frac{1}{3}}$$
**Why Geometric Mean Matters:**
It penalizes uneven development across dimensions. A country with an extremely high income but low life expectancy will receive a lower HDI score than a country with balanced achievements across all three dimensions.
        `
      },
      {
        id: "ch4-t3",
        name: "The Extended HDR Family: IHDI, GDI, GII, and MPI",
        content: `
### Complementary Indices of the Human Development Report
To overcome the national aggregate limitations of HDI, UNDP developed four complementary indices:

1. **Inequality-adjusted HDI (IHDI):**
   Discounts each dimension's average value by the level of domestic inequality across the population using the Atkinson inequality measure. Under perfect equality, $\\text{IHDI} = \\text{HDI}$. The percentage loss indicates the developmental loss due to inequality.

2. **Gender Development Index (GDI):**
   Measures the ratio of female HDI to male HDI: $\\text{GDI} = \\frac{\\text{HDI}_f}{\\text{HDI}_m}$. Values close to 1 indicate gender parity.

3. **Gender Inequality Index (GII):**
   Reflects women's disadvantage in three dimensions:
   * *Reproductive Health:* Maternal mortality ratio and adolescent birth rates.
   * *Empowerment:* Share of parliamentary seats held by women and higher education attainment.
   * *Labor Market:* Labor force participation rates of females versus males.

4. **Multidimensional Poverty Index (MPI):**
   Assesses acute poverty directly at the household level across 10 non-monetary deprivations.
        `
      }
    ]
  },

  // SECTION B
  // CHAPTER 5
  {
    id: "ch-5",
    number: 5,
    section: "Section B",
    title: "Industrialization",
    clo: "CLO 1, 2",
    subtitle: "Meaning, Necessity, ISI vs. EPI, NICs Experience, External Debt, FDI, and Local Economic Development (LED)",
    overview: "Section B shifts to sectoral and structural dynamics. Chapter 5 explores industrial strategies, contrasting Import Substitution Industrialization (ISI) with Export Promotion (EPI), examining the East Asian Tiger experience and Bangladesh's RMG trajectory.",
    handnotes: [
      "Industrialization: The process of structural transformation whereby an agrarian economy shifts resources toward manufacturing and industrial activities characterized by higher value-added and increasing returns.",
      "Lewis Dual Sector Model: Transfer of surplus rural labor with zero marginal productivity ($MP_L = 0$) into the modern urban industrial sector at a constant institutional wage.",
      "Import-Substitution Industrialization (ISI): Inward-looking strategy protecting infant domestic manufacturing via tariffs, quotas, and overvalued currencies. Prone to inefficiency, rent-seeking, and chronic trade deficits.",
      "Export-Promotion Industrialization (EPI): Outward-looking strategy incentivizing domestic firms to compete in global markets via export subsidies, duty drawback schemes, and competitive exchange rates (East Asian Tigers).",
      "Foreign Direct Investment (FDI): Greenfield investments and mergers bringing technology spillovers, managerial expertise, and foreign exchange.",
      "Local Economic Development (LED): Decentralized, place-based development strengthening local clusters (e.g., Khulna shrimp aquaculture, Bogura light engineering)."
    ],
    videos: [
      {
        title: "Import Substitution vs. Export-Oriented Industrialization",
        channel: "MRUniversity",
        youtubeId: "s3G9kZ7fH2E",
        duration: "9 mins",
        description: "Historical comparison of Latin America's ISI stagnation versus East Asia's EPI miracle."
      },
      {
        title: "The East Asian Miracle: Industrial Policy & State Capacity",
        channel: "Khan Academy",
        youtubeId: "9gH2v_e8jL0",
        duration: "13 mins",
        description: "How South Korea and Taiwan utilized export discipline and state-directed credit."
      }
    ],
    readings: [
      "Amsden, Alice H. (1989) - 'Asia's Next Giant: South Korea and Late Industrialization'.",
      "Wade, Robert (1990) - 'Governing the Market: Economic Theory and the Role of Government in East Asian Industrialization'.",
      "Todaro & Smith - Chapter 12: 'Trade Policy and Industrialization'."
    ],
    topics: [
      {
        id: "ch5-t1",
        name: "Industrialization: Meaning, Necessity, and Structural Transformation",
        content: `
### 1. The Imperative of Industrialization in Developing Economies
No country has historically achieved widespread prosperity and high living standards without undergoing industrialization. The developmental necessity of industrialization rests on several economic principles:
* **The Structural Productivity Gap:** In agrarian developing economies, marginal labor productivity in agriculture is exceptionally low. Moving a worker from subsistence agriculture to a modern manufacturing plant produces an immediate leap in output per worker.
* **Engel's Law:** As household income rises, the proportion of income spent on food falls, while the proportion spent on manufactured goods and services increases. An economy specialized exclusively in primary agricultural commodities faces declining world demand relative to global income growth.
* **Prebisch-Singer Thesis:** Over the long run, the net barter terms of trade between primary agricultural commodities and manufactured industrial goods systematically deteriorate for primary exporters. To escape this impoverishing trap, developing nations must industrialize.
* **Increasing Returns to Scale and Dynamic Linkages:** Manufacturing exhibits strong learning-by-doing effects, technical spillovers, and extensive forward and backward linkages that do not exist in subsistence farming.
        `
      },
      {
        id: "ch5-t2",
        name: "Trade Strategies: Import-Substitution (ISI) vs. Export-Promotion (EPI)",
        content: `
### Comparative Analysis of Trade Strategies

| Dimension | Import-Substitution Industrialization (ISI) | Export-Promotion Industrialization (EPI) |
| :--- | :--- | :--- |
| **Strategic Focus** | Inward-looking: Replace foreign imported manufactured goods with domestic production | Outward-looking: Produce manufactured goods for global export markets |
| **Target Market** | Protected, captive domestic consumer market | Highly competitive international global market |
| **Trade Policy Tools** | High protective tariffs, import quotas, import licensing, overvalued exchange rate | Export subsidies, duty drawback schemes, bonded warehouses, competitive/undervalued exchange rate |
| **Efficiency Pressures**| Minimal; creates monopolistic domestic firms shielded from global competition | High; firms must meet stringent global quality, price, and delivery standards |
| **Foreign Exchange Impact** | Intended to save forex, but paradoxically increases forex demand to import capital machinery | Generates massive, continuous foreign currency earnings |
| **Historical Experience**| Latin America (Brazil, Argentina) and South Asia (1950s-1970s): Stagnation, debt crises | East Asian Tigers (South Korea, Taiwan, Singapore) and Bangladesh RMG: Rapid growth |

### The East Asian Experience: Disciplined Industrial Policy
The East Asian Miracle was not a case of pure free-market laissez-faire, nor was it closed protectionism. The "Developmental State" provided targeted subsidies and tariff protection to domestic infant industries, but strictly conditioned those subsidies on **export performance targets** (Alice Amsden, Robert Wade). Firms that failed to compete globally had their state support terminated.
        `
      },
      {
        id: "ch5-t3",
        name: "External Debt, Foreign Direct Investment (FDI), and Local Economic Development (LED)",
        content: `
### 1. External Debt and the Debt Overhang
Developing countries borrow externally to finance their domestic savings gap and foreign exchange gap.
* **Productive Debt:** If borrowed funds are invested in high-return infrastructure (e.g., Padma Bridge, metro rail, deep-sea ports), the resulting economic growth generates tax and export revenue to service the debt.
* **Debt Overhang:** When accumulated external debt exceeds a country's future repayment capacity, expected debt service costs deter domestic and foreign investment, triggering macroeconomic crises.

### 2. Foreign Direct Investment (FDI)
FDI entails a long-term equity investment by a foreign entity, involving management control.
* **Greenfield FDI:** Establishing new operational facilities from the ground up (e.g., foreign apparel factories in BEPZA export processing zones).
* **Brownfield / M&A:** Purchasing existing domestic assets.
* *Developmental Gains:* Technology transfers, global supply chain integration, foreign exchange.
* *Risks:* Profit repatriation, transfer pricing, suppression of domestic fledgling entrepreneurs.

### 3. Local Economic Development (LED)
LED is a decentralized approach where local governments, private businesses, and community actors collaborate to mobilize indigenous resources, create jobs, and stimulate local economies.
* **Cluster Development:** Geographic concentrations of interconnected firms (Michael Porter). Examples in Bangladesh:
  * Khulna & Bagerhat: Frozen shrimp and aquaculture cluster.
  * Savar & Hazaribagh: Leather and footwear cluster.
  * Bogura: Foundry and light engineering agricultural machinery cluster.
        `
      }
    ]
  },

  // CHAPTER 6
  {
    id: "ch-6",
    number: 6,
    section: "Section B",
    title: "Poverty and Its Measurement",
    clo: "CLO 2, 3",
    subtitle: "Definitions, Poverty Line in Bangladesh (CBN Method), Headcount Index, Foster-Greer-Thorbecke (FGT) Index, and MPI",
    overview: "Poverty analysis is central to development policy. This chapter covers the exact mathematics of the Foster-Greer-Thorbecke (FGT) class of poverty measures, the Cost of Basic Needs (CBN) method used by the Bangladesh Bureau of Statistics (BBS), and multidimensional poverty measurement.",
    handnotes: [
      "Absolute Poverty: Severe deprivation of basic human needs (food, safe water, sanitation, shelter, healthcare). Defined against a fixed biological/caloric threshold ($2.15/day).",
      "Relative Poverty: Being poor compared to the prevailing living standard of the surrounding community. Relates inherently to inequality.",
      "Bangladesh Poverty Line (BBS): Measured using the Cost of Basic Needs (CBN) method. Lower Poverty Line = Cost of 2,122 kcal food bundle + minimal non-food expenditure. Upper Poverty Line = Cost of 2,122 kcal bundle + standard non-food allowance.",
      "Headcount Ratio ($H = q/N$): Proportion of the population whose income is below the poverty line ($z$). Blatantly violates Sen's Monotonicity and Transfer Axioms.",
      "Poverty Gap Index ($P_1$): Measures the depth of poverty—how far on average the poor fall below the poverty line.",
      "FGT General Index: $P_\\alpha = \\frac{1}{N} \\sum_{i=1}^q \\left( \\frac{z - y_i}{z} \\right)^\\alpha$. For $\\alpha=0$: Headcount ($P_0$); $\\alpha=1$: Poverty Gap ($P_1$); $\\alpha=2$: Squared Poverty Gap / Severity ($P_2$).",
      "Multidimensional Poverty Index (MPI): Evaluates household deprivations across 10 indicators in Health, Education, and Living Standards using the Alkire-Foster method."
    ],
    videos: [
      {
        title: "Measuring Poverty: Headcount, Poverty Gap & FGT Index",
        channel: "World Bank Institute",
        youtubeId: "sK1c0V9Zp8Q",
        duration: "15 mins",
        description: "Mathematical derivation of $P_0, P_1, P_2$ with step-by-step numerical examples."
      },
      {
        title: "The Multidimensional Poverty Index (MPI) Explained",
        channel: "Oxford Poverty and Human Development Initiative (OPHI)",
        youtubeId: "yU9g2a1H2pU",
        duration: "8 mins",
        description: "Alkire-Foster method, deprivation cutoffs, and household counting."
      }
    ],
    readings: [
      "Foster, Greer, & Thorbecke (1984) - 'A Class of Decomposable Poverty Measures', Econometrica.",
      "BBS (2023) - 'Household Income and Expenditure Survey (HIES) 2022 Final Report', Ministry of Planning, Bangladesh.",
      "Sen, Amartya (1976) - 'Poverty: An Ordinal Approach to Measurement', Econometrica."
    ],
    topics: [
      {
        id: "ch6-t1",
        name: "Poverty: Conceptual Definitions and Types",
        content: `
### 1. Defining Poverty
Poverty is the state of lacking sufficient financial resources, material possessions, or capabilities to achieve a minimum acceptable standard of life.

### 2. Major Classifications of Poverty
* **Absolute Poverty:**
  A condition characterized by severe deprivation of basic human needs. The threshold is held constant across time and across countries in real terms (e.g., World Bank's International Poverty Line of $\\$2.15$ per person per day in 2017 PPP). A person living below this line is fighting for biological survival.
* **Relative Poverty:**
  Poverty defined in relation to the economic status of other members of society. In OECD countries, the relative poverty line is frequently set at 50% or 60% of the median national household income. As national income increases, the relative poverty line automatically rises.
* **Chronic vs. Transient Poverty:**
  * *Chronic Poverty:* Households trapped in structural, inter-generational deprivation due to complete lack of physical and human assets.
  * *Transient Poverty:* Households that fluctuate around the poverty line due to seasonal shocks (e.g., *Monga* in Northern Bangladesh, floods, sudden illness).
* **Subjective Poverty:**
  Based on individuals' own self-perception of whether their income is adequate to make ends meet.
        `
      },
      {
        id: "ch6-t2",
        name: "Poverty Lines in Bangladesh: Cost of Basic Needs (CBN) Methodology",
        content: `
### The Official Methodology of the Bangladesh Bureau of Statistics (BBS)
In Bangladesh, the BBS evaluates poverty using the **Household Income and Expenditure Survey (HIES)** conducted at regular intervals (e.g., 2010, 2016, 2022). The official methodology is the **Cost of Basic Needs (CBN)** method:

1. **The Food Poverty Line (FPL):**
   * A normative minimum consumption food basket is specified that satisfies a nutritional requirement of **2,122 kcal per person per day**, along with 58 grams of protein.
   * The basket contains 11 essential food items: rice, wheat, pulses, milk, oil, meat, fish, potato, vegetables, sugar, and spices.
   * The quantities of these items are valued at local market prices within 16 geographical strata:
   $$\\text{FPL} = \\sum_{k=1}^{11} P_k \\cdot Q_k$$
   Where $P_k$ is the price of item $k$ and $Q_k$ is the standard quantity required to attain 2,122 kcal.

2. **The Lower Poverty Line (Extreme Poverty):**
   * The Lower Poverty Line includes the Food Poverty Line plus a minimal non-food allowance.
   * The non-food allowance is equal to the non-food expenditure of households whose **total consumption expenditure is exactly equal to the Food Poverty Line**. These households are so destitute that they sacrifice essential nutrition to meet basic non-food needs (shelter, clothing).

3. **The Upper Poverty Line (Moderate Poverty):**
   * The Upper Poverty Line includes the Food Poverty Line plus a standard non-food allowance.
   * The non-food allowance is equal to the non-food expenditure of households whose **food expenditure is exactly equal to the Food Poverty Line**.
        `
      },
      {
        id: "ch6-t3",
        name: "Foster-Greer-Thorbecke (FGT) Poverty Indices and Mathematical Derivations",
        content: `
### The Foster-Greer-Thorbecke (FGT) Metric Family (1984)
Let $N$ be the total population, $z$ be the official poverty line, and $y_i$ be the income/consumption of individual $i$.
Order individuals from poorest to richest:
$$y_1 \\le y_2 \\le \\dots \\le y_q < z \\le y_{q+1} \\le \\dots \\le y_N$$
Where $q$ is the total number of individuals living below the poverty line.

The general FGT formula is:
$$P_\\alpha = \\frac{1}{N} \\sum_{i=1}^q \\left( \\frac{z - y_i}{z} \\right)^\\alpha \\quad (\\alpha \\ge 0)$$

#### 1. When $\\alpha = 0$: Headcount Ratio ($P_0$ or $H$)
$$P_0 = \\frac{1}{N} \\sum_{i=1}^q \\left( \\frac{z - y_i}{z} \\right)^0 = \\frac{q}{N} = H$$
* **Meaning:** The proportion of the population that is poor.
* **Fatal Flaws:**
  1. *Violates Monotonicity Axiom:* If a poor person becomes poorer, $P_0$ remains completely unchanged.
  2. *Violates Transfer Axiom:* If income is transferred from a poor person to a richer person, $P_0$ is unchanged.
  3. *Perverse Policy Incentive:* A government aiming to reduce $P_0$ before elections has a perverse incentive to assist only those poor people living *just below* the poverty line ($z - \\epsilon$), completely neglecting the ultra-poor.

#### 2. When $\\alpha = 1$: Poverty Gap Index ($P_1$ or $PG$)
$$P_1 = \\frac{1}{N} \\sum_{i=1}^q \\left( \\frac{z - y_i}{z} \\right)^1 = H \\cdot I$$
Where $I = \\frac{1}{q} \\sum_{i=1}^q \\left( \\frac{z - y_i}{z} \\right)$ is the **Income Gap Ratio**.
* **Meaning:** Measures the **depth of poverty**—the average percentage shortfall of the poor population below the poverty line.
* **Policy Value:** Multiplying $P_1 \\times z \\times N$ yields the exact monetary budget required to lift all poor citizens up to the poverty line through perfectly targeted transfers.

#### 3. When $\\alpha = 2$: Squared Poverty Gap Index ($P_2$ or Severity)
$$P_2 = \\frac{1}{N} \\sum_{i=1}^q \\left( \\frac{z - y_i}{z} \\right)^2$$
* **Meaning:** Measures the **severity of poverty**. By squaring the normalized gap $\\left( \\frac{z - y_i}{z} \\right)$, it assigns disproportionately greater weight to the poorest individuals who fall furthest below $z$.
* Satisfies both Sen's Monotonicity and Transfer Axioms: Any transfer from an ultra-poor person to a less-poor person strictly increases $P_2$.
        `
      },
      {
        id: "ch6-t4",
        name: "The Multidimensional Poverty Index (MPI): Alkire-Foster Methodology",
        content: `
### Alkire-Foster Multidimensional Poverty Index (MPI)
Developed by Sabina Alkire and James Foster at OPHI, MPI replaces single-dimensional monetary metrics with 10 direct deprivations across 3 equally weighted dimensions (weight = $1/3$ each):

1. **Health (Weight: 1/3):**
   * *Nutrition (1/6):* Any adult or child is undernourished.
   * *Child Mortality (1/6):* Any child has died in the family within the past 5 years.
2. **Education (Weight: 1/3):**
   * *Years of Schooling (1/6):* No household member has completed 6 years of schooling.
   * *School Attendance (1/6):* Any school-aged child is not attending school up to age 8.
3. **Living Standards (Weight: 1/3 - each indicator 1/18):**
   * *Cooking Fuel:* Uses solid fuel (dung, wood, charcoal).
   * *Sanitation:* Unimproved sanitation facility or shared with other households.
   * *Drinking Water:* Safe drinking water is not within a 30-minute walk roundtrip.
   * *Electricity:* No electricity access.
   * *Housing:* Inadequate flooring, roof, or walls.
   * *Assets:* Does not own more than one small asset (radio, TV, telephone, bike).

### Dual Cut-off Identification
* Individual deprivation score $c_i = \\sum w_j d_{ij}$ where $0 \\le c_i \\le 1$.
* A household is classified as **Multidimensionally Poor** if their deprivation score $c_i \\ge 0.333$ (deprived in 1/3 or more of weighted indicators).
$$\\text{MPI} = H \\times A$$
Where $H$ is the multidimensional headcount ratio, and $A$ is the average intensity of deprivation among the poor.
        `
      }
    ]
  },

  // CHAPTER 7
  {
    id: "ch-7",
    number: 7,
    section: "Section B",
    title: "Inequality and Its Measurement",
    clo: "CLO 3",
    subtitle: "Meaning, Gini Coefficient, Lorenz Curve, Quintile Ratios, and Kuznets's Inverted-U Hypothesis",
    overview: "Economic growth without equity undermines social cohesion. This chapter provides a rigorous mathematical derivation of the Lorenz curve, Gini coefficient, and examines Simon Kuznets's Inverted-U hypothesis along with contemporary critiques.",
    handnotes: [
      "Economic Inequality: Disparity in the distribution of income, wealth, or consumption across individuals or demographic groups in an economy.",
      "Lorenz Curve: A graphical representation of income distribution plotting the cumulative percentage of the population on the x-axis against the cumulative percentage of national income received on the y-axis.",
      "Line of Perfect Equality: The 45-degree diagonal line where every percentile of the population receives the exact identical share of income.",
      "Gini Coefficient ($G$): The ratio of the area between the 45-degree line and the Lorenz curve ($A$) to the total area under the 45-degree line ($A+B$). $G = A / (A+B) = 2A$. Ranges from 0 (perfect equality) to 1 (perfect inequality).",
      "Kuznets Inverted-U Hypothesis: In early phases of industrialization, income inequality inevitably widens as labor moves from low-productivity agriculture to high-productivity urban industry. Later, inequality narrows due to political democratization, mass education, and welfare transfers."
    ],
    videos: [
      {
        title: "The Lorenz Curve and Gini Coefficient Explained",
        channel: "Khan Academy",
        youtubeId: "yJbdwK2tM78",
        duration: "11 mins",
        description: "Visual derivation of areas A and B, cumulative income shares, and Gini calculations."
      },
      {
        title: "Kuznets Curve: Does Inequality Rise with Growth?",
        channel: "MRUniversity",
        youtubeId: "7k2vW8fB1jI",
        duration: "8 mins",
        description: "The historical mechanics of the Kuznets curve and modern empirical challenges."
      }
    ],
    readings: [
      "Todaro & Smith - Chapter 5: 'Poverty, Inequality, and Development'.",
      "Piketty, Thomas (2014) - 'Capital in the Twenty-First Century', Harvard University Press.",
      "Kuznets, Simon (1955) - 'Economic Growth and Income Inequality', American Economic Review."
    ],
    topics: [
      {
        id: "ch7-t1",
        name: "Inequality: Concepts and Functional vs. Personal Distribution",
        content: `
### 1. Conceptual Distinction
* **Functional Distribution of Income:**
  Examines the division of national income among the primary factors of production: Land (Rent), Labor (Wages), and Capital (Profits/Interest). Focuses on the aggregate shares earned by workers versus capitalists.
* **Personal / Size Distribution of Income:**
  Examines the distribution of income received by individual households or individuals, regardless of the productive source of that income. Individuals are ranked simply by total income.

### 2. Simple Indicators of Inequality
* **Kuznets Ratio (Quintile Ratio):**
  Ratio of the total income received by the top 20% (richest quintile) to the bottom 40% (poorest two quintiles):
  $$\\text{Kuznets Ratio} = \\frac{\\text{Income Share of Richest } 20\\%}{\\text{Income Share of Poorest } 40\\%}$$
* **Palma Ratio (Gabriel Palma):**
  Ratio of the richest 10% share of national income divided by the poorest 40% share. Based on the empirical finding that middle classes (deciles 5 to 9) capture around 50% of income across almost all countries, meaning distributional struggle occurs between the top 10% and bottom 40%.
        `
      },
      {
        id: "ch7-t2",
        name: "The Lorenz Curve and Mathematical Derivation of the Gini Coefficient",
        content: `
### The Lorenz Curve (Max O. Lorenz, 1905)
1. Rank all individuals from lowest income to highest income.
2. The Horizontal Axis ($x$) plots the **Cumulative Percentage of the Population** ($0\\%$ to $100\\%$).
3. The Vertical Axis ($y$) plots the **Cumulative Percentage of National Income** ($0\\%$ to $100\\%$).
4. **Line of Perfect Equality:** The $45^\\circ$ diagonal line from $(0,0)$ to $(1,1)$. Every point on this line indicates that $x\\%$ of the population earns exactly $x\\%$ of national income.
5. **The Lorenz Curve:** Must lie below (or coincide with) the $45^\\circ$ line, is non-decreasing, and is convex to the horizontal axis. The further the Lorenz curve sags away from the diagonal line, the greater the degree of inequality.

### Mathematical Derivation of the Gini Coefficient ($G$)
Let the total area beneath the $45^\\circ$ line of perfect equality be the right-angled triangle with base 1 and height 1:
$$\\text{Area of Triangle} = \\frac{1}{2} \\times 1 \\times 1 = 0.5$$
Let $A$ be the area enclosed between the $45^\\circ$ line and the Lorenz curve, and $B$ be the area beneath the Lorenz curve.
$$\\text{Area}(A) + \\text{Area}(B) = 0.5$$
The Gini Coefficient is defined as:
$$G = \\frac{A}{A + B} = \\frac{A}{0.5} = 2A = 2(0.5 - B) = 1 - 2B$$

#### Discrete Calculation Formula:
Given $k$ ordered income groups where $p_i$ is cumulative population share and $y_i$ is cumulative income share:
$$G = 1 - \\sum_{i=1}^k (p_i - p_{i-1})(y_i + y_{i-1})$$

#### Essential Properties of the Gini Coefficient:
1. **Anonymity:** Does not depend on who the rich or poor individuals are.
2. **Scale Independence:** If everyone's income doubles, the Gini coefficient remains unchanged.
3. **Population Independence:** The metric is invariant to total population size.
4. **Pigou-Dalton Transfer Principle:** Any regressive transfer of income from a poorer individual to a richer individual strictly increases the Gini coefficient.
        `
      },
      {
        id: "ch7-t3",
        name: "Kuznets's Inverted-U Hypothesis: Mechanisms and Contemporary Critiques",
        content: `
### Simon Kuznets's Hypothesis (1955)
Simon Kuznets hypothesized that in the historical course of economic growth, income inequality first rises, reaches a peak, and then gradually declines, forming an **Inverted-U shaped curve** when plotting Inequality (y-axis) against GDP per capita (x-axis).

### Underlying Economic Mechanisms
1. **The Early Phase (Rising Inequality):**
   * Developing economies begin as uniform agrarian societies with low average incomes and relatively low income differentials among subsistence farmers.
   * With initial industrialization, a small modern industrial sector emerges offering higher wages. A minority enters high-paying urban manufacturing and profits accumulate in the hands of capital owners.
   * Because the modern sector is small, overall national inequality widens sharply.
2. **The Mature Phase (Falling Inequality):**
   * As the modern sector expands to absorb the majority of the workforce, rural surplus labor dries up, driving up agricultural wages.
   * Democratic political pressures emerge: universal suffrage, labor unions, public investments in education, progressive taxation, and social safety nets.
   * Inequality consequently contracts.

### Contemporary Empirical Critiques & Thomas Piketty
* **Cross-Sectional vs Time-Series Fallacy:** Kuznets's initial cross-country data compared poor African/Asian countries with rich European nations at a single snapshot in time. Longitudinal studies tracking countries over decades show no deterministic natural law that inequality must fall.
* **Thomas Piketty (*Capital in the 21st Century*):**
  Piketty demonstrated that the mid-20th century decline in inequality was not an automatic market outcome, but resulted from the catastrophic destruction of capital during WWI, WWII, the Great Depression, and high wartime tax rates. Since 1980, whenever the rate of return on capital ($r$) exceeds the economic growth rate ($g$)—$r > g$—wealth inequality automatically widens, refuting the Kuznets hypothesis.
* **The Bangladesh Paradox:** In Bangladesh, recent rapid GDP growth has been accompanied by a rising Gini coefficient (from 0.458 in 2010 to 0.499 in 2022 according to BBS HIES), demonstrating widening income polarization despite strong growth.
        `
      }
    ]
  },

  // CHAPTER 8
  {
    id: "ch-8",
    number: 8,
    section: "Section B",
    title: "Institutions and Development",
    clo: "CLO 4",
    subtitle: "Evolution, Land Ownership, Entrepreneurship, Transaction Costs, Property Rights, Inclusive vs. Extractive Institutions, and Democracy",
    overview: "Why do some nations fail while others prosper? This concluding chapter examines New Institutional Economics (Douglass North, Ronald Coase) and the Acemoglu-Robinson institutional framework of development.",
    handnotes: [
      "Institutions (Douglass North): The 'rules of the game in a society' or the humanly devised constraints that shape human interaction. Divided into Formal (laws, constitutions, property rights) and Informal (norms, customs, sanctions).",
      "Transaction Costs (Ronald Coase): Costs of searching for price information, negotiating contracts, and enforcing agreements. High transaction costs strangle trade and capital investment.",
      "Property Rights (Hernando de Soto): Secure, legally enforceable property rights convert 'dead capital' into liquid, pledgeable collateral, unlocking entrepreneurial credit.",
      "Inclusive Institutions (Acemoglu & Robinson): Enforce property rights, provide level economic playing fields, encourage innovation, and distribute political power broadly (pluralism).",
      "Extractive Institutions (Acemoglu & Robinson): Designed by narrow ruling elites to extract wealth and resources from the broad society while concentrating political power in unaccountable hands.",
      "Democracy and Development: Amartya Sen's argument that democracy has intrinsic, instrumental, and constructive value—most famously, 'No famine has ever taken place in the history of the world in a functioning democracy'."
    ],
    videos: [
      {
        title: "Why Nations Fail: Inclusive vs. Extractive Institutions",
        channel: "Daron Acemoglu / Talks at Google",
        youtubeId: "jThtO-sH7zQ",
        duration: "18 mins",
        description: "Acemoglu presents the institutional hypothesis of economic growth and historical divergence."
      },
      {
        title: "Institutions, Property Rights & Economic Growth",
        channel: "MRUniversity",
        youtubeId: "k5W3Gf4bXGg",
        duration: "10 mins",
        description: "How Douglass North's rules of the game reduce uncertainty and transaction costs."
      }
    ],
    readings: [
      "Acemoglu, D., & Robinson, J. A. (2012) - 'Why Nations Fail: The Origins of Power, Prosperity, and Poverty', Crown Business.",
      "North, Douglass C. (1990) - 'Institutions, Institutional Change and Economic Performance', Cambridge University Press.",
      "Coase, Ronald H. (1937) - 'The Nature of the Firm', Economica."
    ],
    topics: [
      {
        id: "ch8-t1",
        name: "Evolution and Economic Implications of Institutions",
        content: `
### 1. What are Institutions?
Nobel Laureate Douglass North defined institutions as:
> *"The humanly devised constraints that structure political, economic and social interaction. They consist of both informal constraints (sanctions, taboos, customs, traditions, and codes of conduct), and formal rules (constitutions, laws, property rights)."*

### 2. How Institutions Shape Economic Performance
Neoclassical economics assumed zero transaction costs and frictionless markets. In reality, markets fail when institutional infrastructure is absent:
* **Reduction of Uncertainty:** Institutions create stable expectations regarding how economic partners and state actors will behave.
* **Coordination of Complex Exchanges:** Allow impersonal trade across vast geographical distances rather than relying purely on kin or village trust.
* **Lowering Information Asymmetry:** Without consumer protection laws, food safety standards, or transparent market pricing, buyers face severe adverse selection (George Akerlof's Market for Lemons).
        `
      },
      {
        id: "ch8-t2",
        name: "Land Ownership Institutions, Sharecropping, and Property Rights",
        content: `
### 1. Historical Evolution of Land Institutions in Bengal
The colonial land tenure system fundamentally altered South Asian agrarian institutions:
* **The Permanent Settlement of 1793 (Lord Cornwallis):**
  Created the *Zamindari* system across Bengal. Traditional revenue collectors were converted into permanent legal owners of land in exchange for fixed cash taxes paid to the British East India Company.
* **Agrarian Consequences:**
  * Absentee landlordism: Zamindars lived in urban centers (Calcutta), sub-leasing land through tiers of intermediaries (*pattanidars*).
  * Peasant exploitation: Direct cultivators (*ryots*) were subjected to arbitrary rents, extortionate levies (*abwabs*), and eviction, eliminating any incentive to invest in land improvement.

### 2. Sharecropping (*Borga* System) & The Marshallian Inefficiency
* **Alfred Marshall's Inefficiency Hypothesis:**
  In a standard sharecropping contract where the tenant gives 50% of the harvest to the landlord but pays 100% of the labor cost, the tenant will apply labor only up to the point where their marginal cost equals **half** of the marginal product ($MC = 0.5 MP_L$). Hence, sharecropped land is farmed less intensively than owner-cultivated land.
* **Steven Cheung's Counter-Thesis (1969):**
  Cheung argued that landlords can enforce optimal labor effort through close monitoring, contractual renewal threats, and sharing input costs.

### 3. Property Rights and Hernando de Soto's "Mystery of Capital"
Peruvian economist Hernando de Soto argued that the poor in developing nations hold trillions of dollars in real assets (homes, informal businesses, land plots), but these assets exist as **"Dead Capital"**:
* Because they lack formal, registered legal titles, these assets cannot be used as collateral to secure bank loans, cannot be easily sold across impersonal markets, and cannot generate liquid investment capital.
* Formalizing property rights and digitizing land records converts dead capital into live, productive capital.
        `
      },
      {
        id: "ch8-t3",
        name: "Transaction Cost Economics (Ronald Coase & Douglass North)",
        content: `
### Ronald Coase and Transaction Costs
In standard microeconomics, prices adjust instantly and costlessly. Ronald Coase (*The Nature of the Firm*, 1937) showed that utilizing the market mechanism incurs substantial **Transaction Costs**:

1. **Search and Information Costs:** Costs of finding suppliers, determining prevailing market prices, and inspecting product quality.
2. **Bargaining and Contracting Costs:** Costs of negotiating legal agreements, hiring lawyers, and drafting contracts.
3. **Policing and Enforcement Costs:** Costs of monitoring compliance and seeking judicial redress if a contract is breached.

### Institutional Role in Transaction Costs
* When judicial systems are corrupt, property rights insecure, and law enforcement unreliable, transaction costs become prohibitively high.
* High transaction costs discourage long-term capital investments, forcing economic agents into short-term, low-productivity cash transactions among close acquaintances.
* Efficient institutions lower transaction costs, unlocking economies of scale and specialization.
        `
      },
      {
        id: "ch8-t4",
        name: "Inclusive vs. Extractive Institutions (Acemoglu & Robinson) and Role of Democracy",
        content: `
### Daron Acemoglu and James Robinson: *Why Nations Fail* (2012)
Acemoglu and Robinson argue that neither geography, culture, nor ignorance explains why some nations are rich and others poor. The decisive determinant is **Institutions**:

#### 1. Extractive Economic and Political Institutions:
* **Extractive Political Institutions:** Power is concentrated in the hands of a narrow elite with few constraints on the exercise of authority (absolutism, autocracy, oligarchy).
* **Extractive Economic Institutions:** Designed by this elite to extract rents and wealth from the rest of society. They feature insecure property rights for the majority, entry barriers, monopolies, forced labor, and rigged market regulations.
* *Dynamics:* Can achieve short-run growth by allocating resources to high-productivity sectors (e.g., Soviet industrialization), but inevitably stagnates because extractive regimes fear **Creative Destruction**—innovative technology threatens their political hegemony.

#### 2. Inclusive Economic and Political Institutions:
* **Inclusive Political Institutions:** Pluralistic (distributing political power across a broad cross-section of society) and centralized enough to enforce law and order.
* **Inclusive Economic Institutions:** Secure property rights for all, transparent rule of law, access to education, level economic playing field, and freedom of entry into businesses.
* *Dynamics:* Creates sustained innovation, private entrepreneurship, and long-run economic growth.

### The Role of Democracy in Economic Development
* **The Lee Kuan Yew Thesis:** Argues that developing countries require a strong, autocratic state to maintain discipline, suppress social conflicts, and force high savings/investment rates before political liberalization can be afforded.
* **Amartya Sen's Rebuttal:** Sen demonstrates that democracy is constitutive of development itself.
  * *Instrumental Role:* Democratic elections, free press, and political opposition create political incentives for rulers to respond to public distress.
  * *The Famine Thesis:* *"No famine has ever taken place in the history of the world in a functioning democracy with regular elections and a free press."* When crop failures occur in democracies, free media sounds the alarm and democratic governments are forced to act to prevent electoral catastrophe.
        `
      }
    ]
  }
];

// University syllabus and exam model tests metadata
const EXAM_STRUCTURE_INFO = {
  courseCode: "0388 21 DS 2201",
  courseTitle: "Development Economics",
  universityTerm: "2nd Year 2nd Term",
  classTestPattern: "Class tests feature analytical, data-driven, and scenario-based questions (Khulna household surveys, RMG sector development, rural market institutions).",
  marksBreakdown: {
    twoMarks: "2 Marks: Concise, tightly focused analytical definitions, theoretical mechanisms, and exact formulas (equivalent to 1 A4 page in handwritten academic exam format).",
    fiveMarks: "5 Marks: Substantive theoretical comparisons, graphical illustrations, policy trade-offs, and empirical case justifications (equivalent to 3-4 handwritten A4 pages).",
    tenMarks: "10 Marks: Multi-part comprehensive case studies with numerical calculations (FGT poverty index, Gini coefficient), institutional evaluations, and critical policy arguments."
  }
};
