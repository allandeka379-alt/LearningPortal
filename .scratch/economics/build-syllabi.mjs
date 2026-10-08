// Builds content/concepts/economics-o.json and the two Economics syllabus files:
//   content/syllabi/zimsec/o-level/economics/2015-2022.json
//   content/syllabi/cambridge/igcse/economics/2027-2029.json   (Cambridge IGCSE Economics 0455)
// Sources (local only, not in git): .scratch/economics/sources/zimsec-economics.pdf (+ .txt; the Ministry file
// "Economics Forms 1-4.pdf") and 0455-2027-2029.pdf (+ .txt).
// Run from the repo root: node .scratch/economics/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

// ---------------------------------------------------------------------------------------------------------------------
// Concept registry (one concept ≈ one lesson's worth of learning). "ZIMSEC only" / "Cambridge only" in a description
// means only that board's syllabus covers the concept.
const CONCEPTS = [
  // The basic economic problem
  ["econ.basics.scarcity", "The basic economic problem: scarcity, choice and the three questions", "Needs and wants, finite resources and unlimited wants, scarcity and the need to choose, examples of the basic economic problem for consumers, workers, firms and governments, economic goods versus free goods, and the three questions of what, how and for whom to produce. Opportunity cost is separate; how each economic system answers the questions is in econ.systems.types."],
  ["econ.basics.opportunity-cost", "Opportunity cost", "Definition of opportunity cost as the next best alternative forgone, examples in different contexts, and how opportunity cost influences the decisions of consumers, workers, firms and governments. Opportunity cost on a PPC is in econ.basics.ppc."],
  ["econ.basics.ppc", "Production possibility curves: points and movements", "Definition and construction of a PPC from a table of output combinations, points on, inside and outside the curve (efficient, inefficient, unattainable), movements along the curve and the opportunity cost they show, and efficient resource allocation. Shapes and shifts are in econ.basics.ppc-shapes-shifts."],
  ["econ.basics.ppc-shapes-shifts", "PPC shapes and shifts", "Concave (bowed out), straight-line and convex PPCs and what each shape says about opportunity cost (shapes are ZIMSEC depth); outward and inward shifts of a PPC, their causes (changes in the quantity and quality of resources, technology, disasters, emigration) and consequences for economic growth."],
  ["econ.basics.positive-normative", "Positive and normative statements", "ZIMSEC only. Statements of fact that can be tested (positive) versus value judgements and opinions (normative), recognising each in economic discussion."],
  ["econ.basics.factors-of-production", "Factors of production and their rewards", "Land, labour, capital and enterprise defined with examples; their rewards (rent, wages or salaries, interest, profit or loss); causes of changes in the quantity and quality of each factor (for example education and training, investment, migration, discovery of resources, land degradation)."],
  // Economic systems
  ["econ.systems.types", "Economic systems: market, planned and mixed", "ZIMSEC only (Cambridge defines the market and mixed systems in the next two concepts). Features of market (free enterprise), planned (command) and mixed economies, who owns resources and makes decisions in each, and how each system answers what, how and for whom to produce. Arguments for and against are in the next two concepts."],
  ["econ.systems.market-economy", "The market economic system", "Definition of the market economic system (private ownership, decisions through markets, limited government), its advantages (choice, efficiency, incentives, innovation) and disadvantages (inequality, market failure, under-provision of public and merit goods, instability)."],
  ["econ.markets.price-mechanism", "Markets and the price mechanism", "Definition and examples of a market (including informal markets), the roles of buyers and sellers, and how the price mechanism (signalling, incentive and rationing functions) allocates resources and answers what, how and for whom to produce."],
  ["econ.systems.planned-mixed", "Planned and mixed economies", "Advantages and disadvantages of planned and mixed economies; definition of a mixed economy and arguments for and against it; comparing the three systems; Zimbabwe's current economic system as a mixed economy (roles of the state, parastatals, private firms and the informal sector, described without statistics)."],
  // Demand, supply and markets
  ["econ.demand.law-of-demand", "Demand and the law of demand", "Definition of demand, effective demand versus latent (potential) demand, the law of demand, demand schedules and curves, and individual versus market demand (adding individual schedules). Shifts are in econ.demand.shifts."],
  ["econ.demand.shifts", "Changes in demand and changes in quantity demanded", "Determinants of demand other than price (income, prices of substitutes and complements, tastes, population, advertising, expectations, taxes), extensions and contractions along a demand curve versus increases and decreases that shift it, described in words and with schedules."],
  ["econ.supply.law-of-supply", "Supply and the law of supply", "Definition of supply, the law of supply, supply schedules and curves, and individual versus market supply. Shifts are in econ.supply.shifts."],
  ["econ.supply.shifts", "Changes in supply and changes in quantity supplied", "Determinants of supply other than price (costs of production, technology, weather, prices of related goods, number of firms, taxes and subsidies, expectations), extensions and contractions versus increases and decreases in supply."],
  ["econ.supply.climate-change", "Climate change and production", "ZIMSEC only. What climate change is, its effects on production in Zimbabwe (drought, floods, crop yields, livestock, hydro-electricity) and measures to mitigate and adapt (conservation farming, drought-resistant crops, irrigation, reforestation, renewable energy). Well-established facts only."],
  ["econ.markets.equilibrium", "Market equilibrium and disequilibrium", "Equilibrium price and quantity from demand and supply schedules and curves, disequilibrium prices, shortages (excess demand) and surpluses (excess supply), and how the market moves back to equilibrium."],
  ["econ.markets.price-changes", "Price changes: shifts and new equilibrium", "How changes in demand and supply cause price changes, finding the new equilibrium after a shift (described in words and with schedules), and the consequences of price changes for sales."],
  ["econ.markets.price-controls", "Maximum and minimum prices", "Government price ceilings (maximum prices) and price floors (minimum prices) in product markets: definitions, effects shown with schedules and described diagrams (shortages, queues, black markets, surpluses), advantages and disadvantages. Minimum wages are in econ.labour.unions-government."],
  ["econ.markets.taxes-subsidies", "Indirect taxes and subsidies in product markets", "How an indirect tax (specific and ad valorem) shifts supply and raises price, how a subsidy lowers price, the effects on consumers, producers and government, and their advantages and disadvantages as ways to correct market failure."],
  ["econ.markets.other-interventions", "Regulation, privatisation, nationalisation and direct provision", "Definitions, advantages and disadvantages of regulation, privatisation, nationalisation, direct provision of goods and services, and quotas (for example on extracting natural resources) as responses to market failure."],
  // Elasticity
  ["econ.elasticity.ped", "Price elasticity of demand: calculation and values", "Definition of PED, the formula (percentage change in quantity demanded ÷ percentage change in price), calculating it, interpreting values (perfectly inelastic, inelastic, unitary, elastic, perfectly elastic) and describing the demand curve for each."],
  ["econ.elasticity.ped-determinants", "Determinants of price elasticity of demand", "Main influences on PED: availability of substitutes, proportion of income spent, necessity or luxury, habit and addiction, time, definition of the market."],
  ["econ.elasticity.ped-revenue", "PED, spending and revenue", "How price changes affect consumer spending and firms' total revenue depending on PED (shown by calculation and described diagrams), and the significance of PED for households, firms, workers and government (pricing, taxation)."],
  ["econ.elasticity.income-cross", "Income and cross elasticity of demand", "ZIMSEC only. Formulas, calculation and interpretation of income elasticity (normal, inferior, luxury goods) and cross elasticity (substitutes, complements, unrelated goods), and their importance to firms and government."],
  ["econ.elasticity.pes", "Price elasticity of supply", "Definition, formula and calculation of PES, interpreting values (perfectly inelastic to perfectly elastic) and the supply curve for each, determinants (time, spare capacity, stocks, ease of switching factors, nature of the product) and its importance in real situations such as farming."],
  // Market failure
  ["econ.market-failure.goods", "Market failure: public, merit and demerit goods", "Definition of market failure; public goods (non-rival, non-excludable, free-rider problem) and their non-provision by markets; merit goods and under-consumption; demerit goods and over-consumption. Abuse of monopoly power is in econ.structures.monopoly."],
  ["econ.market-failure.externalities", "Private, external and social costs and benefits", "Private costs and benefits, external costs and benefits (externalities), social cost = private cost + external cost and social benefit = private benefit + external benefit, with calculations, and the over-production of goods with external costs and under-production of goods with external benefits. No market-failure diagrams."],
  // Money and banking
  ["econ.money.money", "Barter and money: forms, functions and characteristics", "Barter and its problems (double coincidence of wants), forms and types of money (commodity, coins, notes, bank deposits, electronic and mobile money), money supply measures M1, M2 and M3 (ZIMSEC), functions of money and the characteristics of good money."],
  ["econ.money.banking", "Commercial banks, other financial institutions and the central bank", "Role and importance of commercial banks (deposits, loans, payments, credit creation in outline), merchant banks and building societies; role and importance of a central bank (issuing currency, banker to the government and to banks, lender of last resort, monetary policy, exchange-rate management, supervision), with the Reserve Bank of Zimbabwe as the local example."],
  ["econ.households.spending-saving", "Households: spending, saving and borrowing", "Cambridge only. How income, the rate of interest, confidence, age and culture influence households' spending, saving and borrowing."],
  // Labour
  ["econ.labour.occupation-choice", "Workers: types of workers and choosing an occupation", "Labour and its reward, unskilled, semi-skilled and skilled workers, employees' interests (wages, security, health and safety, fringe benefits), and the wage and non-wage factors that affect an individual's choice of occupation."],
  ["econ.labour.unions-government", "Trade unions, employers and government in wage setting", "Employers' associations, trade unions and workers' committees and their roles; collective bargaining and relative bargaining power; government intervention in wage determination, including a national minimum wage and its effects on the labour market (described with schedules)."],
  ["econ.labour.wage-determination", "Demand for and supply of labour; wage determination", "Derived demand for labour, factors affecting the demand for and supply of labour, the equilibrium wage in a labour market and the effects of changes in demand or supply, described in words and with schedules."],
  ["econ.labour.wage-differentials", "Wage differentials", "Why wages differ: demand and supply of labour, skills and training, risk, prestige, bargaining strength, discrimination (for example by gender), government policy, culture; differences by skill, by sector (primary, secondary, tertiary) and between private and public sectors."],
  ["econ.labour.mobility", "Mobility of labour", "Occupational and geographical mobility of labour, causes of changes in each (skills, training, housing costs, family ties, information) and their consequences for workers, firms and the economy."],
  ["econ.labour.division-of-labour", "Specialisation and division of labour", "Definition of division of labour (worker specialisation) and specialisation, with examples at home, school and in industry, and its advantages and disadvantages."],
  // Production
  ["econ.production.stages", "Stages of production and value addition", "Primary, secondary and tertiary production (sectors) with examples, how they depend on each other, value addition and why it matters to Zimbabwe (for example processing minerals and farm produce), and direct versus indirect production."],
  ["econ.production.land-reform", "Zimbabwe's land reform", "ZIMSEC only. The aims of Zimbabwe's land reform programme and its economic effects (positive and negative) on agricultural production, employment and the economy, using only well-established facts and balanced views; no disputed statistics."],
  ["econ.production.productivity", "Production and productivity", "The difference between production and productivity, measuring productivity (output per worker or per hour), total, average and marginal product (ZIMSEC), influences on productivity, ways of improving it and the effect of investment on productivity."],
  ["econ.production.factor-demand", "Demand for factors; labour-intensive and capital-intensive production", "Cambridge only. Influences on firms' demand for factors of production (demand for the product, factor prices, availability, productivity) and reasons for, advantages and disadvantages of labour-intensive and capital-intensive production."],
  ["econ.production.location-of-industry", "Location of industry", "ZIMSEC only. Factors affecting where firms locate (raw materials, markets, labour, power, transport, water, government policy) and how and why government influences location (incentives, restrictions, infrastructure, growth points)."],
  // Costs, revenue and firms
  ["econ.costs.costs-of-production", "Costs of production", "Fixed, variable, semi-variable and total costs; average fixed, average variable and average total cost; calculating them from a table; how costs change with output (described curves); short run versus long run."],
  ["econ.costs.revenue", "Revenue", "Total revenue and average revenue (and marginal revenue for ZIMSEC): definitions, calculations from price and quantity tables, and how sales affect revenue."],
  ["econ.costs.profit-maximisation", "Marginal analysis, profit and efficiency", "ZIMSEC only. Marginal cost and marginal revenue, the profit-maximising rule MR = MC, normal and abnormal (supernormal) profit and losses, break-even where AR = AC, and allocative and productive efficiency."],
  ["econ.firms.objectives", "Objectives of firms", "Cambridge only. Survival, social welfare, profit maximisation and growth as objectives, and why objectives differ between firms and over time."],
  ["econ.firms.business-organisations", "Forms of business organisation", "ZIMSEC only. Features, advantages and disadvantages of sole traders, partnerships, co-operatives and private and public limited companies, comparing them, and the documents for forming a company (memorandum and articles of association, certificate of incorporation, trading certificate) and what they contain."],
  ["econ.firms.private-public-sector", "Private and public sector firms; public corporations", "Private-sector versus public-sector firms, public corporations (parastatals) and their features, advantages and disadvantages."],
  ["econ.firms.size-mergers", "Small and large firms; growth and mergers", "Advantages and disadvantages of small and large firms, internal and external growth, horizontal, vertical and conglomerate mergers (integration): definitions, examples, advantages, disadvantages and effects on stakeholders."],
  ["econ.firms.economies-of-scale", "Economies and diseconomies of scale", "Internal economies (technical, purchasing, marketing, financial, risk-bearing, managerial) and external economies, internal and external diseconomies, and the long-run average total cost curve described in words and tables."],
  ["econ.firms.multinationals", "Multinational companies", "Features of multinational companies (MNCs) and their advantages and disadvantages to host countries and home countries."],
  ["econ.firms.sources-of-finance", "Sources of finance for firms", "ZIMSEC only. Methods of raising capital: shares, debentures, loans, overdrafts, leasing, hire purchase, retained profits, grants; choosing between them."],
  ["econ.firms.smes-business-plan", "Small and medium enterprises and business plans", "ZIMSEC only. Features of SMEs, their importance and problems in Zimbabwe, ways SMEs survive, the parts of a business plan and a simple cash-flow projection (with checked arithmetic)."],
  // Market structures
  ["econ.structures.competitive-markets", "Competitive markets and perfect competition", "Characteristics, advantages and disadvantages of competitive markets and the effect of many firms on price, quality, choice and profit (both boards); the features of perfect competition (ZIMSEC). No diagrams for Cambridge."],
  ["econ.structures.monopoly", "Monopoly", "Characteristics of monopoly, barriers to entry, advantages and disadvantages, the effect of one firm on price, quality, choice and profit, and monopoly as a cause of market failure (restricted supply and higher prices)."],
  ["econ.structures.monopolistic-competition", "Monopolistic competition and oligopoly", "ZIMSEC only. Features, advantages and disadvantages of monopolistic competition, with an outline of oligopoly (few large firms, interdependence, non-price competition)."],
  ["econ.structures.equilibrium", "Price and output in different market structures", "ZIMSEC only. Short-run and long-run equilibrium of the firm in perfect competition, monopolistic competition and monopoly (normal profit, abnormal profit, losses), price and output determination using MR = MC and AR = AC described with tables, and comparing the structures."],
  // National income and macroeconomics
  ["econ.national-income.measurement", "National income: GDP, GNP and measurement", "ZIMSEC only. Meaning of GDP and GNP (net income from abroad), the income, output and expenditure methods, the components consumption, investment, government spending, exports and imports, and simple calculations."],
  ["econ.national-income.uses-limitations", "Uses and limitations of national income statistics", "ZIMSEC only. How households, firms, government and international bodies use national income statistics (economic activity and growth, living standards, planning), and limitations: double counting, the informal sector, unrecorded activities, inaccurate data, price changes."],
  ["econ.macro.aims-conflicts", "Government macroeconomic aims and conflicts", "Cambridge only. Economic growth, full employment, stable prices, balance of payments stability, redistribution of income and environmental sustainability; why governments choose them and set targets; conflicts between aims."],
  ["econ.fiscal.budget-fiscal-policy", "The government budget and fiscal policy", "Government budget, deficit and surplus (with calculations), main areas of government spending and their effects, definition of fiscal policy, changes in taxes and spending, and how fiscal policy can help achieve macroeconomic aims (for example closing a deficit or controlling inflation)."],
  ["econ.fiscal.taxation", "Taxation", "Reasons for taxation, direct and indirect taxes, progressive, regressive and proportional taxes (with calculations of tax paid and average rates), and the impact of taxation on consumers, workers, firms, the government and the economy."],
  ["econ.monetary.monetary-policy", "Monetary policy", "Definitions of money supply and monetary policy; changes in interest rates, the money supply and the exchange rate; how monetary policy can help achieve macroeconomic aims, including curbing inflation; the central bank's role."],
  ["econ.macro.supply-side-policy", "Supply-side policy", "Cambridge only. Definition and measures (education and training, infrastructure spending, labour market reforms, lower direct taxes, deregulation, incentives to work and invest, privatisation) and their effects on macroeconomic aims."],
  ["econ.growth.economic-growth", "Economic growth: meaning, measurement, causes and consequences", "Meaning of economic growth, measurement by real GDP (nominal versus real), signs of growth, causes (increases in total demand and in the quantity and quality of resources), and its advantages and disadvantages (costs and benefits)."],
  ["econ.growth.recession-policies", "Recession and policies to promote growth", "Cambridge only. Definition of recession, its causes (falls in total demand or in the quantity or quality of resources) and consequences for consumers, workers, firms and government, and the range of policies to promote growth and their effectiveness."],
  ["econ.development.meaning-indicators", "Economic development and its indicators", "Meaning of economic development and how it differs from growth, signs of development (literacy, lower death rates, infrastructure), causes of development, indicators including real GDP per head and the Human Development Index and the advantages and disadvantages of each."],
  ["econ.development.international-differences", "Living standards and international differences in development", "Cambridge only. Reasons for differences in living standards and income distribution within and between countries, and how income, productivity, population growth, the size of sectors, saving and investment, education, healthcare and natural resources cause differences in development."],
  ["econ.development.poverty", "Poverty", "Cambridge only. Absolute and relative poverty, causes (unemployment, low wages, illness, age, environmental factors) and policies to alleviate poverty and redistribute income."],
  ["econ.development.sustainable", "Sustainable development and resource management", "ZIMSEC only. Sustainable resource allocation and management (CAMPFIRE, the Environmental Management Agency, community share ownership trusts, recycling), sustainable development, initiatives and projects with their costs and benefits, and lessons from a newly industrialised country."],
  // Inflation
  ["econ.inflation.meaning-causes", "Inflation: meaning, types and causes", "Definitions of inflation and deflation, demand-pull and cost-push inflation and how to distinguish them (other causes such as excessive money creation in outline)."],
  ["econ.inflation.measurement", "Measuring inflation: price indices", "Consumer Price Index (and the Retail Price Index for ZIMSEC): base year, basket, weights, calculating a weighted index and the rate of inflation, comparing rates for different periods. Zimbabwean inflation history only with widely documented, dated facts."],
  ["econ.inflation.effects-policies", "Effects of inflation and policies to control it", "How inflation affects consumers, workers, savers, lenders, borrowers, producers, government and the economy, and the functions of money (especially store of value) during high inflation; monetary, fiscal and supply-side policies to control inflation and their effectiveness."],
  // Population
  ["econ.population.growth-distribution", "Population size, growth and distribution", "Population and the census and why it is conducted; birth rate, death rate, natural increase, immigration, emigration and net migration; factors affecting population growth and why rates differ between countries; geographical, occupational and age-sex distribution of population."],
  ["econ.population.effects", "Effects of population size and structure", "Optimum, over- and under-population, effects of increases and decreases in population size and of changes in age and gender structure, the dependency ratio, and the link between population and economic development."],
  ["econ.population.hiv-aids", "HIV and AIDS and the economy", "ZIMSEC only. Causes of the spread of HIV, its effects on population, the labour force and economic development, and solutions; factual, respectful and non-stigmatising."],
  ["econ.population.labour-force", "Size and composition of the labour force", "ZIMSEC only. The economically active population (ages as the syllabus gives them), how the composition of the population relates to the labour force, factors affecting its size and composition (skills, training, government policy) and ways of controlling population growth."],
  // Unemployment
  ["econ.unemployment.measurement", "Employment, unemployment and their measurement", "Definitions of employment, unemployment, the labour force and full employment; distinguishing the employed from the unemployed; measuring unemployment with a labour force survey and calculating the unemployment rate."],
  ["econ.unemployment.types", "Types and causes of unemployment", "Frictional, structural, cyclical and seasonal unemployment (both boards) and regional and technological unemployment (ZIMSEC), with causes and examples."],
  ["econ.unemployment.effects-policies", "Effects of unemployment and policies to reduce it", "Consequences of unemployment for individuals, firms, government and the economy, and the range of policies to reduce it and their effectiveness."],
  ["econ.unemployment.job-creation", "Unemployment and job creation in Zimbabwe", "ZIMSEC only. General unemployment trends in Zimbabwe and the informal sector (no specific statistics unless widely documented and dated), job creation through enterprise and indigenisation, and planning a small income-generating project."],
  // Trade
  ["econ.trade.domestic-trade", "Domestic trade", "ZIMSEC only. Characteristics and importance of domestic (home) trade, retailers and wholesalers, formal and informal trade, and the role of informal traders in Zimbabwe's economy."],
  ["econ.trade.international-trade", "Home and foreign trade; specialisation by country", "Characteristics of home and foreign trade compared, exports and imports, definition of specialisation by country, and the advantages and disadvantages of international trade and specialisation."],
  ["econ.trade.comparative-advantage", "Absolute and comparative advantage", "Reasons countries trade: factor endowment, absolute advantage and comparative advantage (with simple output tables and opportunity cost ratios), and specialisation based on the best resource allocation or lowest cost."],
  ["econ.trade.free-trade", "Free trade", "Definition of free trade, its advantages and disadvantages."],
  ["econ.trade.protection", "Protectionism", "Methods of protection (tariffs, import quotas, subsidies, embargoes, exchange controls), reasons (infant and declining industries, strategic industries, dumping, the current account deficit, tax revenue, demerit goods, the environment), and the consequences, advantages and disadvantages of restricting trade."],
  ["econ.trade.globalisation", "Globalisation", "Cambridge only. Definition, causes of changes in globalisation (trade restrictions, transport and communication costs, movement of MNCs) and its effects on trade, competition, the environment, migration, income distribution and development."],
  ["econ.trade.economic-integration", "Economic integration: SADC, COMESA and the African Union", "ZIMSEC only. Forms and reasons for economic integration, the aims of SADC, COMESA and the African Union (well-established facts only), and the benefits and problems of integration for Zimbabwe."],
  ["econ.trade.terms-of-trade", "Terms of trade", "ZIMSEC only. Terms of trade = index of export prices ÷ index of import prices × 100, calculating it, favourable and unfavourable movements and what they mean."],
  ["econ.forex.exchange-rates", "Foreign exchange rates", "Definition, reasons for buying and selling currencies, floating exchange rates determined by demand and supply, appreciation and depreciation, causes of fluctuations (trade, interest rates, speculation), and effects of changes on the prices of and demand for exports and imports, with simple conversions."],
  ["econ.forex.shortages", "Foreign currency shortages", "ZIMSEC only. Causes and problems of foreign exchange shortages and the possible sources of foreign currency for Zimbabwe (exports of minerals and farm produce, tourism, remittances, investment, loans), described without disputed statistics."],
  ["econ.bop.current-account", "The balance of trade and the current account", "Visible and invisible trade, the balance of trade, the components of the current account (trade in goods, trade in services, primary income, secondary income), calculating balances and interpreting deficits and surpluses."],
  ["econ.bop.imbalances-policies", "Current account deficits and surpluses: causes, consequences and policies", "Cambridge only. Reasons for current account deficits and surpluses, their impact on GDP, employment, inflation and the exchange rate, and policies to achieve balance of payments stability."],
];
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase. ZIMSEC: codes are ours (topic code + .n). Cambridge: objective codes
// are the board's printed numbers (e.g. 2.6.2), passed as [code, text].
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((o, i) => (Array.isArray(o) ? { code: o[0], text: o[1] } : { code: `${code}.${i + 1}`, text: o }));
  if (components) n.components = components;
  if (children) n.children = children;
  return n;
};
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);
const NO_P2 = ["1", "3"]; // ZIMSEC topics outside the Paper 2 (data response) list of the specification grid

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level Economics, Forms 1-4, 2015-2022. Topic codes 6.1-6.18 are printed (6.0 Topics); sub-topic and
// objective codes are ours. The form in which each item is taught is given at the start of each objective.
const ZIMSEC_TOPICS = [
  topic("intro", "6.1", "Introduction to Economics", {
    components: NO_P2,
    children: [
      sub("intro.basic-problem", "6.1.1", "The basic economic problem and the basic economic questions", {
        covers: ["econ.basics.scarcity"],
        objectives: [
          "Form 1: explain resources, needs, wants and scarcity, and the basic economic problem of limited resources, unlimited wants and choice.",
          "Form 2: identify and explain the questions of what, how and for whom to produce.",
        ],
      }),
      sub("intro.opportunity-cost", "6.1.2", "Opportunity cost", {
        covers: ["econ.basics.opportunity-cost"],
        objectives: ["Form 3: explain opportunity cost and apply it to choices made by individuals, firms and government."],
      }),
      sub("intro.ppc", "6.1.3", "The production possibility curve and efficient resource allocation", {
        covers: ["econ.basics.ppc"],
        objectives: [
          "Form 3: explain what a PPC shows and construct one from a table of output combinations.",
          "Form 3: interpret points on, inside and outside the PPC as efficient, inefficient and unattainable, and show opportunity cost on it.",
        ],
      }),
      sub("intro.ppc-shapes-shifts", "6.1.4", "Shapes and shifts of the PPC", {
        covers: ["econ.basics.ppc-shapes-shifts"],
        objectives: [
          "Form 4: describe concave, convex and straight-line PPCs and what each shape means.",
          "Form 4: identify outward and inward shifts of a PPC and explain their causes.",
          "Form 4: analyse efficient and sustainable resource allocation.",
        ],
      }),
      sub("intro.positive-normative", "6.1.5", "Positive and normative statements", {
        covers: ["econ.basics.positive-normative"],
        objectives: ["Form 3: distinguish statements of fact (positive) from statements of opinion (normative)."],
      }),
    ],
  }),
  topic("systems", "6.2", "Economic systems", {
    components: NO_P2,
    children: [
      sub("systems.types", "6.2.1", "Types and features of economic systems", {
        covers: ["econ.systems.types"],
        objectives: [
          "Form 1: explain market, planned and mixed economic systems and state the features of each.",
          "Form 2: explain how each system answers the three basic economic questions.",
        ],
      }),
      sub("systems.market", "6.2.2", "The market economy", {
        covers: ["econ.systems.market-economy"],
        objectives: ["Form 3: state and explain the advantages and disadvantages of the market economy."],
      }),
      sub("systems.planned-mixed", "6.2.3", "Planned and mixed economies and Zimbabwe's economic system", {
        covers: ["econ.systems.planned-mixed"],
        objectives: [
          "Form 3: state and explain the advantages and disadvantages of planned and mixed economies.",
          "Form 4: identify similarities and differences among the economic systems and describe Zimbabwe's current economic system.",
        ],
      }),
    ],
  }),
  topic("production", "6.3", "Production", {
    children: [
      sub("production.factors", "6.3.1", "Factors of production and their rewards", {
        covers: ["econ.basics.factors-of-production"],
        objectives: [
          "Form 1: explain production, list and explain the four factors of production and match each to its reward.",
          "Form 2: explain the rewards to the factors of production.",
        ],
      }),
      sub("production.stages", "6.3.2", "Stages of production, value addition and direct and indirect production", {
        covers: ["econ.production.stages"],
        objectives: [
          "Form 2: outline the primary, secondary and tertiary stages of production with examples of activities in each.",
          "Form 3: describe how the three stages depend on each other and explain value addition and its importance.",
          "Form 3: distinguish direct from indirect production.",
        ],
      }),
      sub("production.division-of-labour", "6.3.3", "Division of labour and specialisation", {
        covers: ["econ.labour.division-of-labour"],
        objectives: ["Form 2: state the advantages and disadvantages of specialisation and division of labour."],
      }),
      sub("production.land-reform", "6.3.4", "Land reform", {
        covers: ["econ.production.land-reform"],
        objectives: ["Form 3: explain land reform, identify the aims of Zimbabwe's land reform programme and outline its economic effects."],
      }),
      sub("production.productivity", "6.3.5", "Productivity", {
        covers: ["econ.production.productivity"],
        objectives: ["Form 4: describe and calculate productivity (total, average and marginal product) and describe ways of improving it."],
      }),
      sub("production.location", "6.3.6", "Location of industry", {
        covers: ["econ.production.location-of-industry"],
        objectives: ["Form 4: explain the factors affecting the location of industry and how and why government influences location."],
      }),
    ],
  }),
  topic("labour", "6.4", "Labour", {
    children: [
      sub("labour.workers", "6.4.1", "Labour, types of workers and employees' interests", {
        covers: ["econ.labour.occupation-choice"],
        objectives: [
          "Form 1: explain labour and its reward, and list employees' interests in employment (wages, security, health and safety, fringe benefits).",
          "Form 1: identify and describe unskilled, semi-skilled and skilled workers.",
        ],
      }),
      sub("labour.associations", "6.4.2", "Employers' and employees' associations; trade unions and government", {
        covers: ["econ.labour.unions-government"],
        objectives: [
          "Form 2: identify employers' associations and employees' associations (trade unions, workers' committees) and explain their roles.",
          "Form 3: describe the role of trade unions and explain government intervention in wage determination.",
        ],
      }),
      sub("labour.demand-supply", "6.4.3", "Demand for and supply of labour; wage determination", {
        covers: ["econ.labour.wage-determination"],
        objectives: [
          "Form 3: explain derived demand for labour and the factors affecting the demand for and supply of labour.",
          "Form 4: explain how wages are determined in labour markets.",
        ],
      }),
      sub("labour.differentials", "6.4.4", "Wage differentials", {
        covers: ["econ.labour.wage-differentials"],
        objectives: ["Form 4: identify and explain the bases of wage differentials (training, risk, prestige, gender, government policy, culture)."],
      }),
    ],
  }),
  topic("demand", "6.5", "Demand theory", {
    children: [
      sub("demand.law", "6.5.1", "Demand, the law of demand and the demand curve", {
        covers: ["econ.demand.law-of-demand"],
        objectives: [
          "Form 1: explain effective demand, outline the law of demand and show the relationship between price and quantity demanded.",
          "Form 2: tabulate a demand schedule, plot a demand curve and distinguish effective from latent demand.",
        ],
      }),
      sub("demand.changes", "6.5.2", "Determinants of demand and changes in demand", {
        covers: ["econ.demand.shifts"],
        objectives: ["Form 3: identify the determinants of demand and distinguish a change in demand from a change in quantity demanded, illustrating each."],
      }),
      sub("demand.elasticity", "6.5.3", "Elasticity of demand", {
        children: [
          sub("demand.elasticity.ped", "6.5.3.1", "Price elasticity of demand", {
            covers: ["econ.elasticity.ped"],
            objectives: ["Form 4: explain and calculate price elasticity of demand, interpret its value and illustrate the degrees of elasticity."],
          }),
          sub("demand.elasticity.determinants", "6.5.3.2", "Determinants of elasticity of demand", {
            covers: ["econ.elasticity.ped-determinants"],
            objectives: ["Form 4: outline the determinants of elasticity of demand."],
          }),
          sub("demand.elasticity.importance", "6.5.3.3", "Importance of elasticity of demand", {
            covers: ["econ.elasticity.ped-revenue"],
            objectives: ["Form 4: explain the importance of elasticity of demand to households, firms and government, including the effect of price changes on revenue."],
          }),
          sub("demand.elasticity.income-cross", "6.5.3.4", "Income and cross elasticity of demand", {
            covers: ["econ.elasticity.income-cross"],
            objectives: ["Form 4: calculate and interpret income and cross elasticity of demand."],
          }),
        ],
      }),
    ],
  }),
  topic("supply", "6.6", "Supply theory", {
    children: [
      sub("supply.law", "6.6.1", "Supply, the law of supply and the supply curve", {
        covers: ["econ.supply.law-of-supply"],
        objectives: [
          "Form 1: explain supply, describe the law of supply and show the relationship between price and quantity supplied.",
          "Form 2: draw a supply curve and describe the price-supply relationship it shows.",
        ],
      }),
      sub("supply.changes", "6.6.2", "Determinants of supply and changes in supply", {
        covers: ["econ.supply.shifts"],
        objectives: [
          "Form 2: outline the determinants of supply.",
          "Form 3: show how the determinants shift the supply curve and distinguish increases and decreases in supply from extensions and contractions.",
        ],
      }),
      sub("supply.climate-change", "6.6.3", "Climate change and production", {
        covers: ["econ.supply.climate-change"],
        objectives: ["Form 3: explain climate change, outline its effects on production and suggest mitigating measures."],
      }),
      sub("supply.elasticity", "6.6.4", "Elasticity of supply", {
        covers: ["econ.elasticity.pes"],
        objectives: ["Form 4: explain and calculate price elasticity of supply, interpret its value, describe its determinants and its significance in real situations."],
      }),
    ],
  }),
  topic("equilibrium", "6.7", "Market equilibrium", {
    children: [
      sub("equilibrium.markets", "6.7.1", "Markets and the price mechanism", {
        covers: ["econ.markets.price-mechanism"],
        objectives: ["Form 2: describe how buyers and sellers interact in a market and how prices allocate resources."],
      }),
      sub("equilibrium.point", "6.7.2", "Interaction of demand and supply; equilibrium", {
        covers: ["econ.markets.equilibrium"],
        objectives: ["Form 2: illustrate the interaction of demand and supply and explain equilibrium price, quantity and point."],
      }),
      sub("equilibrium.changes", "6.7.3", "Changes in the equilibrium point", {
        covers: ["econ.markets.price-changes"],
        objectives: ["Form 3: show shifts of the demand and supply curves, how a new equilibrium is established and what causes the shifts."],
      }),
      sub("equilibrium.price-controls", "6.7.4", "Government intervention on prices", {
        covers: ["econ.markets.price-controls"],
        objectives: ["Form 4: explain price ceilings and price floors and illustrate their effects (shortages and surpluses)."],
      }),
    ],
  }),
  topic("costs", "6.8", "Cost structures and revenue", {
    children: [
      sub("costs.costs", "6.8.1", "Costs of production", {
        covers: ["econ.costs.costs-of-production"],
        objectives: [
          "Form 1: explain and calculate fixed, variable and total costs.",
          "Form 2: explain semi-variable costs and illustrate the cost curves.",
          "Form 3: distinguish the short run from the long run and illustrate average cost curves.",
        ],
      }),
      sub("costs.revenue", "6.8.2", "Revenue", {
        covers: ["econ.costs.revenue"],
        objectives: ["Form 1 and Form 4: explain and calculate total, average and marginal revenue."],
      }),
      sub("costs.profit", "6.8.3", "Marginal cost, profit maximisation and efficiency", {
        covers: ["econ.costs.profit-maximisation"],
        objectives: [
          "Form 4: explain marginal cost and identify the profit-maximising rule (MR = MC).",
          "Form 4: describe normal and abnormal profit, the break-even condition (AR = AC) and economic efficiency.",
        ],
      }),
    ],
  }),
  topic("structures", "6.9", "Market structures", {
    children: [
      sub("structures.perfect", "6.9.1", "Perfect competition", {
        covers: ["econ.structures.competitive-markets"],
        objectives: ["Form 3: describe the features of perfect competition and explain its advantages and disadvantages."],
      }),
      sub("structures.monopolistic", "6.9.2", "Monopolistic competition", {
        covers: ["econ.structures.monopolistic-competition"],
        objectives: ["Form 3: describe the features of monopolistic competition and explain its advantages and disadvantages."],
      }),
      sub("structures.monopoly", "6.9.3", "Monopoly", {
        covers: ["econ.structures.monopoly"],
        objectives: ["Form 3: describe the features of monopoly and explain its advantages and disadvantages."],
      }),
      sub("structures.equilibrium", "6.9.4", "Short-run and long-run equilibrium; comparing market structures", {
        covers: ["econ.structures.equilibrium"],
        objectives: [
          "Form 4: describe short-run and long-run equilibrium in each market structure and identify the profit-maximising output.",
          "Form 4: compare the features and outcomes of the different market structures.",
        ],
      }),
    ],
  }),
  topic("business", "6.10", "Business organisation", {
    components: NO_P2,
    children: [
      sub("business.forms", "6.10.1", "Sole traders, partnerships, co-operatives and limited companies", {
        covers: ["econ.firms.business-organisations"],
        objectives: [
          "Form 1: describe sole traders and partnerships and outline their features, advantages and disadvantages.",
          "Form 2: describe co-operatives and their advantages and disadvantages.",
          "Form 2: explain limited companies and outline the documents used to set them up and their contents.",
          "Form 3: compare private and public limited companies and outline their advantages and disadvantages.",
        ],
      }),
      sub("business.public-corporations", "6.10.2", "Public corporations", {
        covers: ["econ.firms.private-public-sector"],
        objectives: ["Form 3: describe public corporations and their advantages and disadvantages."],
      }),
      sub("business.mnc", "6.10.3", "Multinational corporations", {
        covers: ["econ.firms.multinationals"],
        objectives: ["Form 3: describe the features of multinational companies and outline their costs and benefits to host countries."],
      }),
      sub("business.finance", "6.10.4", "Methods of raising capital", {
        covers: ["econ.firms.sources-of-finance"],
        objectives: ["Form 4: describe methods of raising finance such as shares, debentures and leasing."],
      }),
      sub("business.growth", "6.10.5", "Growth of firms and integration", {
        covers: ["econ.firms.size-mergers"],
        objectives: ["Form 4: explain methods of growth of firms and describe the effects of vertical and horizontal integration on stakeholders."],
      }),
      sub("business.scale", "6.10.6", "Economies and diseconomies of scale", {
        covers: ["econ.firms.economies-of-scale"],
        objectives: ["Form 4: distinguish between economies and diseconomies of scale."],
      }),
      sub("business.smes", "6.10.7", "Small to medium enterprises and business plans", {
        covers: ["econ.firms.smes-business-plan"],
        objectives: [
          "Form 4: outline the features of SMEs and describe how they survive.",
          "Form 4: draw up a business plan with a cash-flow projection.",
        ],
      }),
    ],
  }),
  topic("national-income", "6.11", "National income accounting", {
    children: [
      sub("national-income.measurement", "6.11.1", "GDP, GNP and the measurement of national income", {
        covers: ["econ.national-income.measurement"],
        objectives: [
          "Form 1: explain Gross Domestic Product and Gross National Product.",
          "Form 2: identify and explain the income, output and expenditure methods.",
          "Form 3: identify and explain the components of national income (consumption, government expenditure, investment, exports and imports).",
        ],
      }),
      sub("national-income.uses", "6.11.2", "Uses and limitations of national income statistics", {
        covers: ["econ.national-income.uses-limitations"],
        objectives: ["Form 4: discuss the uses of national income statistics by different agents and explain their limitations."],
      }),
    ],
  }),
  topic("money", "6.12", "Money and banking", {
    components: NO_P2,
    children: [
      sub("money.money", "6.12.1", "Barter and money", {
        covers: ["econ.money.money"],
        objectives: [
          "Form 1: explain barter trade and its advantages and disadvantages, and outline the types of money (M1, M2 and M3).",
          "Form 2: outline the characteristics of money and explain its functions.",
        ],
      }),
      sub("money.banking", "6.12.2", "Financial institutions and the central bank", {
        covers: ["econ.money.banking"],
        objectives: [
          "Form 3: describe the role of commercial banks, merchant banks and building societies in an economy.",
          "Form 3: explain the functions of a central bank, using the Reserve Bank of Zimbabwe.",
        ],
      }),
      sub("money.fiscal", "6.12.3", "Fiscal policy and the national budget", {
        children: [
          sub("money.fiscal.budget", "6.12.3.1", "Fiscal policy and the budget", {
            covers: ["econ.fiscal.budget-fiscal-policy"],
            objectives: ["Form 4: describe how fiscal policy (government spending and the national budget) can be used to achieve economic objectives."],
          }),
          sub("money.fiscal.taxation", "6.12.3.2", "Taxation", {
            covers: ["econ.fiscal.taxation"],
            objectives: ["Form 4: explain taxation as a fiscal policy instrument (direct and indirect, progressive and proportional taxes)."],
          }),
        ],
      }),
      sub("money.monetary", "6.12.4", "Monetary policy", {
        covers: ["econ.monetary.monetary-policy"],
        objectives: ["Form 4: distinguish monetary from fiscal policy and describe how monetary policy can be used to achieve economic objectives."],
      }),
    ],
  }),
  topic("inflation", "6.13", "Inflation", {
    children: [
      sub("inflation.causes", "6.13.1", "Meaning and causes of inflation", {
        covers: ["econ.inflation.meaning-causes"],
        objectives: ["Form 2: explain inflation and describe and distinguish demand-pull and cost-push inflation."],
      }),
      sub("inflation.measurement", "6.13.2", "Measurement of inflation", {
        covers: ["econ.inflation.measurement"],
        objectives: ["Form 4: calculate the rate of inflation using the CPI and RPI and compare rates of inflation in Zimbabwe for different periods."],
      }),
      sub("inflation.effects-policies", "6.13.3", "Effects of inflation and policies to curb it", {
        covers: ["econ.inflation.effects-policies"],
        objectives: [
          "Form 3: explain the effects of inflation on consumers, producers, government and the functions of money.",
          "Form 4: explain the monetary and fiscal policy tools used to curb inflation.",
        ],
      }),
    ],
  }),
  topic("population", "6.14", "Population", {
    children: [
      sub("population.growth", "6.14.1", "Census, population growth and distribution", {
        covers: ["econ.population.growth-distribution"],
        objectives: [
          "Form 1: explain population and the census and discuss why a census is conducted.",
          "Form 2: describe the geographical, occupational and demographic distribution of population and explain population growth.",
          "Form 3: explain the factors affecting population (birth rates, death rates, migration, government policy).",
        ],
      }),
      sub("population.effects", "6.14.2", "Population size and economic development", {
        covers: ["econ.population.effects"],
        objectives: [
          "Form 2: identify high, low and sustainable population sizes and discuss their effects.",
          "Form 3: discuss how population size and composition affect economic development.",
        ],
      }),
      sub("population.mobility", "6.14.3", "Mobility of labour", {
        covers: ["econ.labour.mobility"],
        objectives: ["Form 3: explain occupational and geographical mobility of labour as factors affecting population and the labour force."],
      }),
      sub("population.hiv", "6.14.4", "HIV and AIDS", {
        covers: ["econ.population.hiv-aids"],
        objectives: ["Form 3: identify the causes of HIV and AIDS, explain their effects on population and economic development and suggest solutions."],
      }),
      sub("population.labour-force", "6.14.5", "Size and composition of the labour force", {
        covers: ["econ.population.labour-force"],
        objectives: [
          "Form 4: relate the composition of the population to the labour force and explain what affects its size and composition.",
          "Form 4: describe ways of controlling population.",
        ],
      }),
    ],
  }),
  topic("unemployment", "6.15", "Unemployment and job creation", {
    children: [
      sub("unemployment.meaning", "6.15.1", "Unemployment and the labour force", {
        covers: ["econ.unemployment.measurement"],
        objectives: ["Form 1: explain unemployment and the labour force and distinguish the employed from the unemployed."],
      }),
      sub("unemployment.types", "6.15.2", "Types and causes of unemployment", {
        covers: ["econ.unemployment.types"],
        objectives: ["Form 2: identify and explain structural, frictional, seasonal, regional and cyclical unemployment."],
      }),
      sub("unemployment.effects", "6.15.3", "Effects of and solutions to unemployment", {
        covers: ["econ.unemployment.effects-policies"],
        objectives: ["Form 3: outline the effects of unemployment and propose solutions."],
      }),
      sub("unemployment.job-creation", "6.15.4", "Unemployment trends and job creation in Zimbabwe", {
        covers: ["econ.unemployment.job-creation"],
        objectives: [
          "Form 4: describe unemployment trends in Zimbabwe and job creation.",
          "Form 4: explain how enterprise and indigenisation can reduce unemployment and plan a small income-generating project.",
        ],
      }),
    ],
  }),
  topic("trade", "6.16", "Domestic and foreign trade", {
    children: [
      sub("trade.domestic", "6.16.1", "Domestic trade", {
        covers: ["econ.trade.domestic-trade"],
        objectives: [
          "Form 1: describe the characteristics and importance of domestic trade and of retailers and wholesalers.",
          "Form 1: distinguish formal from informal trade and state the role of informal traders.",
        ],
      }),
      sub("trade.home-foreign", "6.16.2", "Home and foreign trade", {
        covers: ["econ.trade.international-trade"],
        objectives: ["Form 2: describe and compare home and foreign trade and outline the advantages and disadvantages of international trade."],
      }),
      sub("trade.reasons", "6.16.3", "Reasons for international trade", {
        covers: ["econ.trade.comparative-advantage"],
        objectives: ["Form 3: distinguish exports from imports and explain the reasons for international trade: absolute advantage, comparative advantage and factor endowment."],
      }),
      sub("trade.bop", "6.16.4", "Balance of trade and balance of payments", {
        covers: ["econ.bop.current-account"],
        objectives: ["Form 3: calculate the balance of trade and the current account of the balance of payments and interpret a deficit or surplus."],
      }),
      sub("trade.terms", "6.16.5", "Terms of trade", {
        covers: ["econ.trade.terms-of-trade"],
        objectives: ["Form 4: describe, calculate and interpret the terms of trade."],
      }),
      sub("trade.forex", "6.16.6", "Foreign exchange", {
        covers: ["econ.forex.exchange-rates"],
        objectives: ["Form 4: explain foreign exchange and exchange rates and the relationship between the Zimbabwean currency and other currencies."],
      }),
      sub("trade.forex-shortages", "6.16.7", "Foreign exchange shortages", {
        covers: ["econ.forex.shortages"],
        objectives: ["Form 4: outline the problems resulting from foreign exchange shortages and the possible sources of foreign currency."],
      }),
      sub("trade.free-trade", "6.16.8", "Free trade", {
        covers: ["econ.trade.free-trade"],
        objectives: ["Form 4: outline the reasons for and the merits and demerits of free trade."],
      }),
      sub("trade.protectionism", "6.16.9", "Protectionism", {
        covers: ["econ.trade.protection"],
        objectives: ["Form 4: describe ways of protectionism, with their merits and demerits."],
      }),
      sub("trade.integration", "6.16.10", "Economic integration", {
        covers: ["econ.trade.economic-integration"],
        objectives: ["Form 4: give reasons for economic integration, with SADC, COMESA and the African Union as examples."],
      }),
    ],
  }),
  topic("growth", "6.17", "Economic growth and development", {
    children: [
      sub("growth.growth", "6.17.1", "Economic growth", {
        covers: ["econ.growth.economic-growth"],
        objectives: [
          "Form 1: explain economic growth and identify signs of growth.",
          "Form 3: identify and explain the causes of economic growth.",
          "Form 4: identify and discuss the costs and benefits of economic growth.",
        ],
      }),
      sub("growth.development", "6.17.2", "Economic development and its indicators", {
        covers: ["econ.development.meaning-indicators"],
        objectives: [
          "Form 2: explain economic development and identify signs of development.",
          "Form 3: distinguish economic growth from development and explain the causes of development.",
          "Form 4: state and explain the indicators of growth and development.",
        ],
      }),
      sub("growth.sustainable", "6.17.3", "Sustainable development and resource management", {
        covers: ["econ.development.sustainable"],
        objectives: [
          "Form 4: explain sustainable resource management and how economic agents should manage resources sustainably.",
          "Form 4: explain sustainable development, discuss ways of achieving it and plan a sustainable development project.",
        ],
      }),
    ],
  }),
  topic("market-failure", "6.18", "Market failure and government intervention", {
    description: "Listed in the topic list (6.18) and in the Paper 1 and Paper 3 content of the specification grid, but the scope and sequence and the competency matrix give it no content. The sub-topics are ours, taken from the glossary terms (public goods, private and social costs and benefits, ad valorem tax, privatisation, market failure).",
    components: NO_P2,
    children: [
      sub("market-failure.goods", "6.18.1", "Market failure: public, merit and demerit goods", {
        covers: ["econ.market-failure.goods"],
        objectives: ["Explain market failure and why markets fail to provide public goods and under-provide merit goods."],
      }),
      sub("market-failure.externalities", "6.18.2", "Private, external and social costs and benefits", {
        covers: ["econ.market-failure.externalities"],
        objectives: ["Distinguish private, external and social costs and benefits and explain their effect on resource allocation."],
      }),
      sub("market-failure.taxes-subsidies", "6.18.3", "Indirect taxes and subsidies", {
        covers: ["econ.markets.taxes-subsidies"],
        objectives: ["Explain how indirect taxes and subsidies are used to correct market failure."],
      }),
      sub("market-failure.interventions", "6.18.4", "Regulation, privatisation and nationalisation", {
        covers: ["econ.markets.other-interventions"],
        objectives: ["Explain regulation, privatisation, nationalisation and direct provision as forms of government intervention."],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "o-level",
  subject: "economics",
  versionLabel: "2015-2022",
  family: "economics-o",
  title: "ZIMSEC O-Level Economics",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Economics Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/Economics%20Forms%201-4.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and their numbers (6.1 to 6.18) are transcribed from the topic list (6.0) of the Ministry's Economics Syllabus Forms 1 - 4 (2015 - 2022); the content of each topic and the form in which it is taught come from the scope and sequence (7.0) and the competency matrix (8.0). Sub-topic and objective codes are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the Mashonaland West provincial education office's copy of the Ministry document, file 'Economics Forms 1-4.pdf' (http://www.mopsemashwest.gov.zw/files/Economics%20Forms%201-4.pdf; the site's https certificate has expired, so the https URL recorded here may not load), read through a text rendering. The cover prints 'Forms 1 - 4', '2015 - 2022' and the year 2015. The scope-and-sequence and competency-matrix tables come out of the text rendering with their columns scrambled; the form of each item is read from the column positions and cross-checked against the matrix (Form 1 to Form 4 sections, 8.1 to 8.4). Check every heading, the form of each item and each objective against a clean copy from ZIMSEC.",
    "Subject code: not printed in the syllabus document. ZIMSEC O-Level Economics is commonly cited as 4048; confirm it (code left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level Economics examinations use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Assessment (9.0) as read: continuous assessment 30% (practical assignments, theory tests and a written research project; Form 1 5%, Form 2 5%, Form 3 10%, Form 4 10%) and a summative examination 70%: Paper 1 Multiple choice (40 four-option items, 1 hour 15 minutes, 40 marks, 20%), Paper 2 Data response (two compulsory 20-mark questions testing knowledge, understanding and problem solving, 1 hour 15 minutes, 40 marks, 20%) and Paper 3 Essays (attempt 4 of 10 questions, 40 marks, 30%). The assessment table gives Paper 3 1 hour 15 minutes but the description of papers says 2 hours: 75 minutes is recorded and must be confirmed, together with the marks per essay (40 marks over four essays suggests 10 each; ZIMSEC may set two-part essays).",
    "Specification grid as read: Papers 1 and 3 examine all 18 topics; Paper 2 (data response) examines Production, Labour, Demand theory, Supply theory, Market equilibrium, Cost structures and revenue, Market structures, National income accounting, Inflation, Population, Unemployment and job creation, Domestic and foreign trade, and Economic growth and development. The other five topics (6.1, 6.2, 6.10, 6.12, 6.18) carry components [1, 3]. Skill distribution printed: knowledge and understanding 30 (Paper 1) and 20 (Paper 2), interpretation and application 40 and 40, problem solving 30 and 40 (percentages).",
    "Topic 6.18 'Market failure and government intervention' is in the topic list and the specification grid but has no scope-and-sequence entry and no competency-matrix pages; its sub-topics and objectives here are ours, based on the glossary (public goods, private and social costs, ad valorem tax, privatisation). Confirm the expected depth with ZIMSEC; the concepts are shared with Cambridge 0455.",
    "Where the topic list and the matrix place an item under different topics, the matrix is followed: fiscal and monetary policy are taught under Money and banking (Form 4), mobility of labour under Population (Form 3), division of labour under Production (Form 2). Taxation is not named in the matrix but fiscal policy and the glossary (progressive, proportional and ad valorem taxation) require it.",
    "The matrix sometimes repeats a page (Domestic and foreign trade, Form 3; National income accounting, Form 4) and the text rendering garbles some cells (for example the public corporation and limited company cells of Form 3); nothing was inferred from garbled cells beyond the clearly legible headings.",
    "Zimbabwe-specific items (land reform, Zimbabwe's economic system, inflation rates in Zimbabwe, unemployment trends, indigenisation, CAMPFIRE, EMA, community share trusts, ZIMASSET as a suggested resource) are taught with well-established facts only; content must not invent or quote statistics. The matrix asks learners to 'identify the current rate of inflation in Zimbabwe': content teaches how to find and interpret the official figure rather than stating one.",
    "Not in this syllabus (taught in the family for Cambridge IGCSE only): households' spending and saving, labour- and capital-intensive production and the demand for factors, objectives of firms, government macroeconomic aims and conflicts, supply-side policy, recession, poverty, international differences in living standards, globalisation, and causes, consequences and policies for current account imbalances. The continuous assessment (projects, practical assignments) is not simulated.",
  ],
  overview: "The ZIMSEC O-Level Economics syllabus (Forms 1-4) introduces the basic economic problem and economic systems, then microeconomics (production, labour, demand and supply, elasticity, market equilibrium, costs and revenue, market structures and business organisation) and macroeconomics (national income, money and banking, inflation, population, unemployment, trade and the balance of payments, growth and development, market failure). It is taught with Zimbabwean examples and stresses enterprise, sustainable resource use and Unhu/Ubuntu/Vumunhu.",
  assessmentOverview: "Continuous assessment (assignments, tests and a research project, Forms 1-4) carries 30%. The examination carries 70%: Paper 1 has 40 four-option multiple-choice items (1 hour 15 minutes, 20%), Paper 2 has two compulsory 20-mark data-response questions (1 hour 15 minutes, 20%) and Paper 3 asks candidates to answer four of ten essay questions (40 marks, 30%).",
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory multiple-choice items with four options (A to D), covering all 18 topics.", durationMinutes: 75, maxMarks: 40, weightingPercent: 20 },
    { code: "2", name: "Paper 2: Data response", kind: "WRITTEN", description: "Two compulsory data-response questions of 20 marks each, testing knowledge, understanding and problem solving on 13 of the topics.", durationMinutes: 75, maxMarks: 40, weightingPercent: 20 },
    { code: "3", name: "Paper 3: Essays", kind: "WRITTEN", description: "Ten essay questions on all the topics, of which candidates answer four. Duration printed as 1 hour 15 minutes in the assessment table and 2 hours in the description of papers (to be confirmed).", durationMinutes: 75, maxMarks: 40, weightingPercent: 30 },
  ],
  topics: ZIMSEC_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge IGCSE Economics 0455, 2027-2029. Topic, subtopic and objective numbers are the board's.
const C0455_TOPICS = [
  topic("basic-problem", "1", "The basic economic problem", {
    children: [
      sub("basic-problem.nature", "1.1", "The nature of the basic economic problem", {
        covers: ["econ.basics.scarcity"],
        objectives: [
          ["1.1.1", "Define the basic economic problem and scarcity, with examples for consumers, workers, firms and governments."],
          ["1.1.2", "Explain the three questions of what, how and for whom to produce."],
          ["1.1.3", "Distinguish economic goods from free goods."],
        ],
      }),
      sub("basic-problem.factors", "1.2", "Factors of production", {
        covers: ["econ.basics.factors-of-production"],
        objectives: [
          ["1.2.1", "Define land, labour, capital and enterprise and their rewards."],
          ["1.2.2", "Explain the causes of changes in the quantity and quality of the factors of production."],
        ],
      }),
      sub("basic-problem.opportunity-cost", "1.3", "Opportunity cost", {
        covers: ["econ.basics.opportunity-cost"],
        objectives: [
          ["1.3.1", "Define opportunity cost and give examples in different contexts."],
          ["1.3.2", "Explain how opportunity cost influences the decisions of consumers, workers, firms and governments."],
        ],
      }),
      sub("basic-problem.ppc", "1.4", "Production possibility curve (PPC) diagrams", {
        children: [
          sub("basic-problem.ppc.points", "1.4.1-1.4.3", "PPCs: drawing, points and movements", {
            covers: ["econ.basics.ppc"],
            objectives: [
              ["1.4.1", "Define a PPC and draw and interpret a PPC diagram."],
              ["1.4.2", "Explain the significance of points under, on and beyond a PPC."],
              ["1.4.3", "Explain movements along a PPC and the opportunity cost they show."],
            ],
          }),
          sub("basic-problem.ppc.shifts", "1.4.4", "Shifts of a PPC", {
            covers: ["econ.basics.ppc-shapes-shifts"],
            objectives: [["1.4.4", "Explain the causes and consequences of shifts of a PPC in terms of economic growth."]],
          }),
        ],
      }),
    ],
  }),
  topic("allocation", "2", "The allocation of resources", {
    children: [
      sub("allocation.markets", "2.1", "The role of markets in allocating resources", {
        covers: ["econ.markets.price-mechanism"],
        objectives: [["2.1.1", "Define a market, give examples and describe the roles of buyers and sellers."]],
      }),
      sub("allocation.demand", "2.2", "Demand", {
        children: [
          sub("allocation.demand.individual-market", "2.2.1", "Individual and market demand", {
            covers: ["econ.demand.law-of-demand"],
            objectives: [["2.2.1", "Define demand, link individual and market demand, and draw and interpret a demand diagram."]],
          }),
          sub("allocation.demand.changes", "2.2.2-2.2.3", "Movements along and shifts of a demand curve", {
            covers: ["econ.demand.shifts"],
            objectives: [
              ["2.2.2", "Explain the causes of extensions and contractions in demand and illustrate them."],
              ["2.2.3", "Explain the causes of increases and decreases in demand and illustrate shifts of the demand curve."],
            ],
          }),
        ],
      }),
      sub("allocation.supply", "2.3", "Supply", {
        children: [
          sub("allocation.supply.individual-market", "2.3.1", "Individual and market supply", {
            covers: ["econ.supply.law-of-supply"],
            objectives: [["2.3.1", "Define supply, link individual and market supply, and draw and interpret a supply diagram."]],
          }),
          sub("allocation.supply.changes", "2.3.2-2.3.3", "Movements along and shifts of a supply curve", {
            covers: ["econ.supply.shifts"],
            objectives: [
              ["2.3.2", "Explain the causes of extensions and contractions in supply and illustrate them."],
              ["2.3.3", "Explain the causes of increases and decreases in supply and illustrate shifts of the supply curve."],
            ],
          }),
        ],
      }),
      sub("allocation.price-determination", "2.4", "Price determination", {
        covers: ["econ.markets.equilibrium"],
        objectives: [
          ["2.4.1", "Explain how the price mechanism answers what, how and for whom to produce."],
          ["2.4.2", "Define market equilibrium and interpret it from schedules and from demand and supply curves."],
          ["2.4.3", "Define disequilibrium and interpret shortages and surpluses from schedules and diagrams."],
        ],
      }),
      sub("allocation.price-changes", "2.5", "Price changes", {
        covers: ["econ.markets.price-changes"],
        objectives: [
          ["2.5.1", "Explain how changes in demand and supply cause price changes."],
          ["2.5.2", "Explain the effect of price changes on sales and use demand and supply diagrams to show changes in market conditions."],
        ],
      }),
      sub("allocation.ped", "2.6", "Price elasticity of demand (PED)", {
        children: [
          sub("allocation.ped.calculation", "2.6.1-2.6.2", "Definition and calculation of PED", {
            covers: ["econ.elasticity.ped"],
            objectives: [
              ["2.6.1", "Define price elasticity of demand."],
              ["2.6.2", "Calculate PED with the formula, interpret its value from perfectly inelastic to perfectly elastic, and draw demand curves showing different PED."],
            ],
          }),
          sub("allocation.ped.determinants", "2.6.3", "Determinants of PED", {
            covers: ["econ.elasticity.ped-determinants"],
            objectives: [["2.6.3", "Explain the main influences on whether demand is elastic or inelastic."]],
          }),
          sub("allocation.ped.revenue", "2.6.4-2.6.5", "PED, spending, revenue and decision-making", {
            covers: ["econ.elasticity.ped-revenue"],
            objectives: [
              ["2.6.4", "Show by diagram and calculation how price changes affect consumer spending and firms' revenue, depending on PED."],
              ["2.6.5", "Explain the implications of PED for decisions by consumers, workers, firms and government."],
            ],
          }),
        ],
      }),
      sub("allocation.pes", "2.7", "Price elasticity of supply (PES)", {
        covers: ["econ.elasticity.pes"],
        objectives: [
          ["2.7.1", "Define price elasticity of supply."],
          ["2.7.2", "Calculate PES with the formula, interpret its value and draw supply curves showing different PES."],
          ["2.7.3", "Explain the main influences on whether supply is elastic or inelastic."],
        ],
      }),
      sub("allocation.market-system", "2.8", "Market economic system", {
        covers: ["econ.systems.market-economy"],
        objectives: [
          ["2.8.1", "Define the market economic system."],
          ["2.8.2", "Explain the advantages and disadvantages of the market economic system."],
        ],
      }),
      sub("allocation.market-failure", "2.9", "Market failure", {
        covers: ["econ.market-failure.goods", "econ.market-failure.externalities"],
        objectives: [
          ["2.9.1", "Define market failure."],
          ["2.9.2", "Define public, merit and demerit goods, private, external and social costs and benefits, and monopoly."],
          ["2.9.3", "Explain the causes of market failure."],
          ["2.9.4", "Explain the consequences of market failure: over- and under-consumption, non-provision of public goods and monopoly restricting supply (no diagrams)."],
        ],
      }),
      sub("allocation.mixed", "2.10", "Mixed economic system", {
        children: [
          sub("allocation.mixed.system", "2.10.1-2.10.2", "The mixed economic system", {
            covers: ["econ.systems.planned-mixed"],
            objectives: [
              ["2.10.1", "Define the mixed economic system."],
              ["2.10.2", "Explain the advantages and disadvantages of the mixed economic system."],
            ],
          }),
          sub("allocation.mixed.prices", "2.10.3a", "Maximum and minimum prices", {
            covers: ["econ.markets.price-controls"],
            objectives: [["2.10.3a", "Define maximum and minimum prices in product markets, draw and interpret their diagrams and explain their advantages and disadvantages."]],
          }),
          sub("allocation.mixed.taxes-subsidies", "2.10.3b", "Indirect taxation and subsidies", {
            covers: ["econ.markets.taxes-subsidies"],
            objectives: [["2.10.3b", "Define indirect taxes and subsidies, draw and interpret their diagrams and explain their advantages and disadvantages in addressing market failure."]],
          }),
          sub("allocation.mixed.other", "2.10.3c", "Regulation, privatisation, nationalisation, direct provision and quotas", {
            covers: ["econ.markets.other-interventions"],
            objectives: [["2.10.3c", "Define regulation, privatisation, nationalisation, direct provision and quotas and explain their advantages and disadvantages."]],
          }),
        ],
      }),
    ],
  }),
  topic("micro", "3", "Microeconomic decision-makers", {
    children: [
      sub("micro.money-banking", "3.1", "Money and banking", {
        children: [
          sub("micro.money-banking.money", "3.1.1", "Money", {
            covers: ["econ.money.money"],
            objectives: [["3.1.1", "Describe the forms, functions and characteristics of money."]],
          }),
          sub("micro.money-banking.banking", "3.1.2", "Banking", {
            covers: ["econ.money.banking"],
            objectives: [["3.1.2", "Explain the role and importance of central banks and commercial banks."]],
          }),
        ],
      }),
      sub("micro.households", "3.2", "Households", {
        covers: ["econ.households.spending-saving"],
        objectives: [["3.2.1", "Explain how income, the rate of interest, confidence, age and culture influence households' spending, saving and borrowing."]],
      }),
      sub("micro.workers", "3.3", "Workers", {
        children: [
          sub("micro.workers.occupation", "3.3.1", "Choice of occupation", {
            covers: ["econ.labour.occupation-choice"],
            objectives: [["3.3.1", "Explain the wage and non-wage factors affecting an individual's choice of occupation."]],
          }),
          sub("micro.workers.wages", "3.3.2", "Wage determination", {
            covers: ["econ.labour.wage-determination", "econ.labour.unions-government"],
            objectives: [["3.3.2", "Explain how labour demand and supply, trade union bargaining power and government policy (including a national minimum wage) determine wages, with diagrams."]],
          }),
          sub("micro.workers.differences", "3.3.3", "Reasons for differences in wages", {
            covers: ["econ.labour.wage-differentials"],
            objectives: [["3.3.3", "Explain why wages differ by skill, sector, sex and between the private and public sectors."]],
          }),
          sub("micro.workers.mobility", "3.3.4", "Mobility of labour", {
            covers: ["econ.labour.mobility"],
            objectives: [["3.3.4", "Explain the causes and consequences of changes in the occupational and geographical mobility of labour."]],
          }),
          sub("micro.workers.division", "3.3.5", "Division of labour", {
            covers: ["econ.labour.division-of-labour"],
            objectives: [["3.3.5", "Define division of labour and explain its advantages and disadvantages."]],
          }),
        ],
      }),
      sub("micro.firms", "3.4", "Firms", {
        children: [
          sub("micro.firms.types", "3.4.1", "Different types of firms", {
            covers: ["econ.production.stages", "econ.firms.private-public-sector"],
            objectives: [["3.4.1", "Classify firms as primary, secondary or tertiary and private or public sector, and explain the advantages and disadvantages of small and large firms."]],
          }),
          sub("micro.firms.mergers", "3.4.2", "Mergers", {
            covers: ["econ.firms.size-mergers"],
            objectives: [["3.4.2", "Define horizontal, vertical and conglomerate mergers and explain their advantages and disadvantages with examples."]],
          }),
          sub("micro.firms.scale", "3.4.3", "Economies and diseconomies of scale", {
            covers: ["econ.firms.economies-of-scale"],
            objectives: [["3.4.3", "Explain internal and external economies and diseconomies of scale and draw and interpret average total cost diagrams to show them."]],
          }),
        ],
      }),
      sub("micro.production", "3.5", "Firms and production", {
        children: [
          sub("micro.production.factors", "3.5.1-3.5.2", "Demand for factors; labour-intensive and capital-intensive production", {
            covers: ["econ.production.factor-demand"],
            objectives: [
              ["3.5.1", "Explain the influences on the demand for factors of production."],
              ["3.5.2", "Explain why firms adopt labour-intensive or capital-intensive production and the advantages and disadvantages of each."],
            ],
          }),
          sub("micro.production.productivity", "3.5.3", "Production and productivity", {
            covers: ["econ.production.productivity"],
            objectives: [["3.5.3", "Distinguish production from productivity and explain the influences on them, including changes in investment."]],
          }),
        ],
      }),
      sub("micro.costs", "3.6", "Firms' costs, revenue and objectives", {
        children: [
          sub("micro.costs.costs", "3.6.1-3.6.2", "Costs of production", {
            covers: ["econ.costs.costs-of-production"],
            objectives: [
              ["3.6.1", "Define total, average total, fixed, average fixed, variable and average variable cost."],
              ["3.6.2", "Calculate these costs and draw and interpret diagrams of how output affects costs."],
            ],
          }),
          sub("micro.costs.revenue", "3.6.3-3.6.4", "Revenue", {
            covers: ["econ.costs.revenue"],
            objectives: [
              ["3.6.3", "Define total revenue and average revenue."],
              ["3.6.4", "Calculate total and average revenue and explain how sales influence revenue."],
            ],
          }),
          sub("micro.costs.objectives", "3.6.5", "Objectives of firms", {
            covers: ["econ.firms.objectives"],
            objectives: [["3.6.5", "Explain survival, social welfare, profit maximisation and growth as objectives of firms."]],
          }),
        ],
      }),
      sub("micro.markets", "3.7", "Types of markets", {
        children: [
          sub("micro.markets.competitive", "3.7.1", "Competitive markets", {
            covers: ["econ.structures.competitive-markets"],
            objectives: [["3.7.1", "Explain the characteristics, advantages and disadvantages of competitive markets and the effect of many firms on price, quality, choice and profit (no diagrams)."]],
          }),
          sub("micro.markets.monopoly", "3.7.2", "Monopoly markets", {
            covers: ["econ.structures.monopoly"],
            objectives: [["3.7.2", "Explain the characteristics, advantages and disadvantages of monopoly and the effect of one firm on price, quality, choice and profit (no diagrams)."]],
          }),
        ],
      }),
    ],
  }),
  topic("macro", "4", "Government and the macroeconomy", {
    children: [
      sub("macro.aims", "4.1", "Government macroeconomic intervention", {
        covers: ["econ.macro.aims-conflicts"],
        objectives: [["4.1.1", "Explain the macroeconomic aims of government, the reasons for and targets of each, and the possible conflicts between them."]],
      }),
      sub("macro.fiscal", "4.2", "Fiscal policy", {
        children: [
          sub("macro.fiscal.budget", "4.2.1-4.2.2", "Government budget and spending; fiscal policy measures", {
            covers: ["econ.fiscal.budget-fiscal-policy"],
            objectives: [
              ["4.2.1", "Define the government budget, a budget deficit and a budget surplus and calculate their size."],
              ["4.2.2", "Explain the main areas of government spending and the reasons for and effects of spending in them."],
              ["4.2.4", "Define fiscal policy."],
              ["4.2.5", "Describe fiscal policy measures: changes in taxes and government spending."],
              ["4.2.6", "Explain how fiscal policy may help a government achieve its macroeconomic aims."],
            ],
          }),
          sub("macro.fiscal.taxation", "4.2.3", "Taxation", {
            covers: ["econ.fiscal.taxation"],
            objectives: [["4.2.3", "Explain the reasons for taxation, classify taxes as progressive, regressive or proportional and direct or indirect, and explain their impact."]],
          }),
        ],
      }),
      sub("macro.monetary", "4.3", "Monetary policy", {
        covers: ["econ.monetary.monetary-policy"],
        objectives: [
          ["4.3.1", "Define the money supply and monetary policy."],
          ["4.3.2", "Describe monetary policy measures: changes in the interest rate, the money supply and the foreign exchange rate."],
          ["4.3.3", "Explain how monetary policy may help a government achieve its macroeconomic aims."],
        ],
      }),
      sub("macro.supply-side", "4.4", "Supply-side policy", {
        covers: ["econ.macro.supply-side-policy"],
        objectives: [
          ["4.4.1", "Define supply-side policy."],
          ["4.4.2", "Describe supply-side policy measures."],
          ["4.4.3", "Explain how supply-side policy may help a government achieve its macroeconomic aims."],
        ],
      }),
      sub("macro.growth", "4.5", "Economic growth", {
        children: [
          sub("macro.growth.growth", "4.5.1-4.5.3", "Definition, measurement, causes and consequences of growth", {
            covers: ["econ.growth.economic-growth"],
            objectives: [
              ["4.5.1", "Define economic growth."],
              ["4.5.2", "Explain the measurement of economic growth by real GDP."],
              ["4.5.3", "Explain the causes of economic growth and its advantages and disadvantages."],
            ],
          }),
          sub("macro.growth.recession", "4.5.4-4.5.5", "Recession and policies to promote growth", {
            covers: ["econ.growth.recession-policies"],
            objectives: [
              ["4.5.4", "Define recession and explain its causes and consequences."],
              ["4.5.5", "Evaluate the policies available to promote economic growth."],
            ],
          }),
        ],
      }),
      sub("macro.unemployment", "4.6", "Employment and unemployment", {
        children: [
          sub("macro.unemployment.measurement", "4.6.1-4.6.2", "Definitions and measurement of unemployment", {
            covers: ["econ.unemployment.measurement"],
            objectives: [
              ["4.6.1", "Define employment, unemployment and full employment."],
              ["4.6.2", "Explain how unemployment is measured by a labour force survey and calculate the unemployment rate."],
            ],
          }),
          sub("macro.unemployment.types", "4.6.3", "Causes and types of unemployment", {
            covers: ["econ.unemployment.types"],
            objectives: [["4.6.3", "Explain frictional, structural, cyclical and seasonal unemployment."]],
          }),
          sub("macro.unemployment.effects", "4.6.4-4.6.5", "Consequences of unemployment and policies to reduce it", {
            covers: ["econ.unemployment.effects-policies"],
            objectives: [
              ["4.6.4", "Explain the consequences of unemployment for individuals, firms, the government and the economy."],
              ["4.6.5", "Evaluate the policies available to reduce unemployment."],
            ],
          }),
        ],
      }),
      sub("macro.inflation", "4.7", "Inflation", {
        children: [
          sub("macro.inflation.causes", "4.7.1+4.7.3", "Inflation, deflation and the causes of inflation", {
            covers: ["econ.inflation.meaning-causes"],
            objectives: [
              ["4.7.1", "Define inflation and deflation."],
              ["4.7.3", "Explain demand-pull and cost-push inflation."],
            ],
          }),
          sub("macro.inflation.measurement", "4.7.2", "Measurement of inflation", {
            covers: ["econ.inflation.measurement"],
            objectives: [["4.7.2", "Explain how inflation is measured with the Consumer Prices Index."]],
          }),
          sub("macro.inflation.consequences", "4.7.4-4.7.5", "Consequences of inflation and policies to control it", {
            covers: ["econ.inflation.effects-policies"],
            objectives: [
              ["4.7.4", "Explain how inflation affects savers, lenders, borrowers, consumers, workers, firms and the economy."],
              ["4.7.5", "Evaluate the policies available to control inflation."],
            ],
          }),
        ],
      }),
    ],
  }),
  topic("development", "5", "Economic development", {
    children: [
      sub("development.living-standards", "5.1", "Living standards", {
        children: [
          sub("development.living-standards.indicators", "5.1.1", "Indicators of living standards", {
            covers: ["econ.development.meaning-indicators"],
            objectives: [["5.1.1", "Explain real GDP per head and the Human Development Index as indicators of living standards, with their advantages and disadvantages."]],
          }),
          sub("development.living-standards.comparing", "5.1.2+5.4", "Comparing living standards; differences in development between countries", {
            covers: ["econ.development.international-differences"],
            objectives: [
              ["5.1.2", "Explain the reasons for differences in living standards and income distribution within and between countries."],
              ["5.4.1", "Explain how differences in income, productivity, population growth, sectors, saving and investment, education, healthcare and natural resources cause differences in development."],
            ],
          }),
        ],
      }),
      sub("development.poverty", "5.2", "Poverty", {
        covers: ["econ.development.poverty"],
        objectives: [
          ["5.2.1", "Distinguish absolute from relative poverty."],
          ["5.2.2", "Explain the causes of poverty."],
          ["5.2.3", "Explain policies to alleviate poverty and redistribute income."],
        ],
      }),
      sub("development.population", "5.3", "Population", {
        children: [
          sub("development.population.growth", "5.3.1", "Factors that affect population growth", {
            covers: ["econ.population.growth-distribution"],
            objectives: [["5.3.1", "Define birth rate, death rate and net migration and explain why they vary between countries."]],
          }),
          sub("development.population.effects", "5.3.2", "Effects of changes in the size and structure of populations", {
            covers: ["econ.population.effects"],
            objectives: [["5.3.2", "Explain the concept of an optimum population and the effects of changes in the size and in the age and gender structure of a population."]],
          }),
        ],
      }),
    ],
  }),
  topic("trade", "6", "International trade and globalisation", {
    children: [
      sub("trade.specialisation", "6.1", "Specialisation and free trade", {
        children: [
          sub("trade.specialisation.country", "6.1.1", "Specialisation by country", {
            covers: ["econ.trade.international-trade", "econ.trade.comparative-advantage"],
            objectives: [["6.1.1", "Define specialisation by country, explain its basis in the best resource allocation or lowest cost, and its advantages and disadvantages."]],
          }),
          sub("trade.specialisation.free-trade", "6.1.2", "Free trade", {
            covers: ["econ.trade.free-trade"],
            objectives: [["6.1.2", "Define free trade and explain its advantages and disadvantages."]],
          }),
        ],
      }),
      sub("trade.globalisation", "6.2", "Globalisation and trade restrictions", {
        children: [
          sub("trade.globalisation.globalisation", "6.2.1-6.2.2", "Globalisation", {
            covers: ["econ.trade.globalisation"],
            objectives: [
              ["6.2.1", "Define globalisation."],
              ["6.2.2", "Explain the causes of changes in globalisation and their effects on trade, competition, the environment, migration, income distribution and development."],
            ],
          }),
          sub("trade.globalisation.mnc", "6.2.3", "Role of multinational companies", {
            covers: ["econ.firms.multinationals"],
            objectives: [["6.2.3", "Explain the advantages and disadvantages of MNCs to host and home countries."]],
          }),
          sub("trade.globalisation.restrictions", "6.2.4-6.2.6", "Trade restrictions", {
            covers: ["econ.trade.protection"],
            objectives: [
              ["6.2.4", "Describe tariffs, import quotas, subsidies and embargoes."],
              ["6.2.5", "Explain the reasons for trade restrictions."],
              ["6.2.6", "Explain the consequences of trade restrictions for the home country and its partners, and the advantages and disadvantages of restricting trade."],
            ],
          }),
        ],
      }),
      sub("trade.exchange-rates", "6.3", "Foreign exchange rates", {
        covers: ["econ.forex.exchange-rates"],
        objectives: [
          ["6.3.1", "Define the foreign exchange rate."],
          ["6.3.2", "Explain the reasons for buying and selling foreign currencies."],
          ["6.3.3", "Explain how a floating exchange rate is determined, define appreciation and depreciation, and explain the causes of fluctuations."],
          ["6.3.4", "Explain how exchange rate changes affect the prices of and demand for exports and imports."],
        ],
      }),
      sub("trade.bop", "6.4", "Current account of the balance of payments", {
        children: [
          sub("trade.bop.structure", "6.4.1", "Structure of the current account", {
            covers: ["econ.bop.current-account"],
            objectives: [["6.4.1", "Describe the components of the current account and calculate deficits and surpluses on it and its sections."]],
          }),
          sub("trade.bop.imbalances", "6.4.2-6.4.4", "Causes, consequences and policies for current account imbalances", {
            covers: ["econ.bop.imbalances-policies"],
            objectives: [
              ["6.4.2", "Explain the reasons for current account deficits and surpluses."],
              ["6.4.3", "Explain the impact of deficits and surpluses on GDP, employment, inflation and the exchange rate."],
              ["6.4.4", "Evaluate the policies available to achieve balance of payments stability."],
            ],
          }),
        ],
      }),
    ],
  }),
];

const c0455 = {
  board: "cambridge",
  qualification: "igcse",
  subject: "economics",
  versionLabel: "2027-2029",
  family: "economics-o",
  title: "Cambridge IGCSE Economics (0455)",
  code: "0455",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2029-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE Economics 0455 syllabus for 2027, 2028 and 2029 (version 1)",
    url: "https://www.cambridgeinternational.org/Images/718148-2027-2029-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic and subtopic headings and their numbers (1 to 6, 1.1 to 6.4) are transcribed from the subject content of the official syllabus; objective codes are the syllabus's own content numbers (for example 2.6.2), and where we split or merged content numbers into one node the node code says so (for example 2.2.2-2.2.3; 2.10.3a to 2.10.3c are ours, splitting 2.10.3). Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Read 2026-10-08 from the official PDF (version 1, for exams in 2027, 2028 and 2029): the six topics, every numbered subtopic and content item, the assessment overview, the details of the assessment and the list of changes.",
    "This version is examined from 2027. A student sitting the examination in 2026 is examined on the 2023-2025/2026 syllabus, which is not in the repository; the 2027-2029 version is published as the current version because new students now will sit 2027 or later. Changes listed for 2027: Paper 1 increased from 30 to 40 questions and from 45 minutes to 1 hour; Paper 2 reduced from 90 to 80 marks and from 2 hours 15 minutes to 2 hours, with a smaller Question 1; AO3 Evaluation weighting reduced.",
    "Assessment overview as read: all candidates take Paper 1 Multiple Choice (1 hour, 40 marks, 30%, 40 questions on all the content, may include calculations and diagram analysis) and Paper 2 Structured Questions (2 hours, 80 marks, 70%): Section A, one compulsory 20-mark question with parts (a) to (f) based on unseen information about a real economic situation (text, data, possibly tables and diagrams); Section B, three of four 20-mark questions, each introduced by a short context paragraph and with four parts (a) to (d), where part (d) is a two-sided evaluative discussion marked with levels of response. Calculators allowed in both papers. Grades A* to G; no tiers. AO weightings: AO1 43%, AO2 47%, AO3 10% overall (Paper 1: 50/50/0; Paper 2: 40/45/15).",
    "Notes printed in the content: demand and supply diagrams for market failure are not required (2.9); diagrams and perfect or imperfect competition theory are not required for competitive markets and monopoly (3.7). Removed for 2027 (not taught for Cambridge): fixed exchange rate systems, population pyramid interpretation, the claimant count, principles of taxation, deflation content beyond its definition, and PPCs in the context of recession and growth causes.",
    "Not in this syllabus (taught in the family for ZIMSEC only): the three economic systems compared (econ.systems.types), positive and normative statements, PPC shapes (concave, convex and straight-line) beyond shifts, income and cross elasticity, climate change and production as a topic, land reform, location of industry, marginal cost and revenue and profit maximisation, monopolistic competition and market-structure equilibrium, forms of business organisation and sources of finance, SMEs and business plans, national income measurement and its uses and limitations, HIV and AIDS, labour force composition, domestic trade, terms of trade, economic integration, foreign currency shortages, job creation in Zimbabwe and sustainable resource management initiatives.",
  ],
  overview: "Cambridge IGCSE Economics covers six topics: the basic economic problem (scarcity, factors of production, opportunity cost, PPCs); the allocation of resources (markets, demand and supply, price determination, elasticity, market and mixed economies, market failure and government intervention); microeconomic decision-makers (money and banking, households, workers, firms, costs and revenue, competitive and monopoly markets); government and the macroeconomy (aims, fiscal, monetary and supply-side policy, growth, unemployment, inflation); economic development (living standards, poverty, population); and international trade and globalisation (specialisation, free trade and restrictions, exchange rates, the current account).",
  assessmentOverview: "All candidates take Paper 1 Multiple Choice (1 hour, 40 questions, 40 marks, 30%) and Paper 2 Structured Questions (2 hours, 80 marks, 70%: one compulsory 20-mark data question in Section A and three of four 20-mark questions in Section B). Calculators may be used in both.",
  components: [
    { code: "1", name: "Paper 1: Multiple Choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory multiple-choice questions on all the subject content; may require calculations and the analysis of diagrams.", durationMinutes: 60, maxMarks: 40, weightingPercent: 30, calculatorAllowed: true },
    { code: "2", name: "Paper 2: Structured Questions", kind: "WRITTEN", description: "Section A: one compulsory 20-mark question, parts (a) to (f), on unseen information about a real economic situation. Section B: three of four 20-mark questions, each with parts (a) to (d); part (d) is an evaluative discussion marked by levels.", durationMinutes: 120, maxMarks: 80, weightingPercent: 70, calculatorAllowed: true },
  ],
  topics: C0455_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered at most once per syllabus, every concept is covered
// by at least one syllabus, node keys and objective codes are unique, and report what each syllabus leaves out.
const coveredAnywhere = new Set();
for (const s of [zimsec, c0455]) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  let nodes = 0;
  const walk = (list, ancestors) => {
    for (const n of list) {
      nodes++;
      if (keys.has(n.key)) throw new Error(`${s.board}: duplicate node key ${n.key}`);
      keys.add(n.key);
      if ((n.covers ?? []).length && (n.children ?? []).length) throw new Error(`${s.board}: ${n.key} covers concepts and has children (cover on the most specific node)`);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coveredAnywhere.add(c);
      }
      for (const o of n.objectives ?? []) {
        if (codes.has(o.code)) throw new Error(`${s.board}: duplicate objective code ${o.code}`);
        codes.add(o.code);
      }
      walk(n.children ?? [], [...ancestors, n.key]);
    }
  };
  walk(s.topics, []);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} topics, ${nodes} nodes, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coveredAnywhere.has(k));
if (orphans.length) throw new Error(`concepts no syllabus covers: ${orphans.join(", ")}`);
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept keys");
for (const [k] of CONCEPTS) if (!/^econ\.[a-z-]+\.[a-z-]+$/.test(k)) throw new Error(`bad concept key ${k}`);
console.log(`${CONCEPTS.length} concepts in the registry`);

const registry = {
  family: "economics-o",
  name: "Economics (O-Level / IGCSE)",
  level: "O",
  prefix: "econ",
  subjects: ["zimsec/o-level/economics", "cambridge/igcse/economics"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/economics-o.json", registry);
write("content/syllabi/zimsec/o-level/economics/2015-2022.json", zimsec);
write("content/syllabi/cambridge/igcse/economics/2027-2029.json", c0455);
