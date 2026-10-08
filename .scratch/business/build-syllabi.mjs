// Builds content/concepts/business-commerce-o.json and the three syllabus files of the family:
//   content/syllabi/zimsec/o-level/commerce/2015-2022.json            (ZIMSEC O-Level Commerce, Forms 1-4)
//   content/syllabi/zimsec/o-level/business-studies/2015-2022.json    (ZIMSEC O-Level Business Enterprise (and) Skills)
//   content/syllabi/cambridge/igcse/business-studies/2027-2029.json   (Cambridge IGCSE Business 0264)
// Sources (local only, not in git): .scratch/business/sources/zimsec-commerce.pdf (+ .txt),
// zimsec-business-enterprise-skills.pdf (+ .txt), 0264-2027-2029.pdf (+ .txt).
// Run from the repo root: node .scratch/business/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

// ---------------------------------------------------------------------------------------------------------------------
// Concept registry (one concept ≈ one lesson's worth). The bracket at the end of each description says which syllabi
// cover it: COM = ZIMSEC Commerce, BES = ZIMSEC Business Enterprise and Skills, CAM = Cambridge IGCSE Business 0264.
const CONCEPTS = [
  // Production
  ["bus.production.business-activity", "Business activity, needs and wants, and the factors of production", "Why people produce: needs and wants, goods (consumer and producer goods) and services, scarcity, choice and opportunity cost; the production function (inputs, processes, outputs); the four factors of production (land, labour, capital, enterprise) and their rewards (rent, wages, interest, profit). [COM, BES, CAM]"],
  ["bus.production.sectors", "Stages and sectors of production", "Primary (extractive), secondary (manufacturing and construction) and tertiary (commercial and direct services) production; the chain of production from raw material to consumer; interdependence of the sectors; how commerce (trade and the aids to trade) relates to production; changes in the importance of the sectors as an economy develops. Not private and public sector (see bus.organisation.purpose-sectors). [COM, BES, CAM]"],
  ["bus.production.ownership-indigenisation", "Ownership of the means of production", "Why it matters who owns land, minerals and capital; land as heritage; land reform; indigenisation and economic empowerment; the role of government in widening local ownership of the economy. Neutral, factual treatment of policy. [COM]"],
  ["bus.production.division-of-labour", "Direct and indirect production, division of labour and mass production", "Direct production (producing for one's own use) and indirect production (producing for exchange); division of labour and specialisation (by person, process, region and country), their advantages and disadvantages; mass production. [COM]"],
  ["bus.production.value-addition", "Adding value: value addition and beneficiation", "Added value as the difference between the selling price and the cost of bought-in materials and how a business can increase it (branding, quality, processing, convenience, service); value addition and beneficiation of Zimbabwe's minerals and agricultural produce at each stage of production; benefits to the producer, the community and the country. [COM, BES, CAM]"],
  // Operations
  ["bus.operations.production-methods", "Methods of production: job, batch and flow", "Job, batch and flow production, their features, advantages and disadvantages, and recommending a method for a given business. [CAM]"],
  ["bus.operations.efficiency-lean", "Productivity, efficiency and lean production", "Calculating labour productivity (output per employee per period); why efficiency matters and how to raise it (automation, technology, better labour skills); lean production through just-in-time inventory control and Kaizen, with advantages and disadvantages. [CAM]"],
  ["bus.operations.purchasing-inventory", "Purchasing and inventory management", "The purchasing function and its importance; the five rights of purchasing (right quality, quantity, price, time, source/supplier); the purchasing cycle and e-purchasing; types of inventory (raw materials, work in progress, finished goods); why businesses hold inventory, the costs and benefits of holding it and the factors that affect how much is held. [BES, CAM]"],
  ["bus.operations.technology", "Technology and ICT in production and operations", "Automation and mechanisation, computer-aided design and manufacture (CAD/CAM), 3D printing, bar codes, radio frequency identification (RFID), electronic stock control, online billing and contactless payments in services; advantages and disadvantages of new technology for businesses and employees; recommending ICT tools for a given enterprise. [BES, CAM]"],
  ["bus.operations.sustainability", "Sustainable production and use of resources", "How businesses can produce sustainably: renewable energy, using fewer resources and less waste, reusing, recycling, environmentally friendly products and packaging; sustainable use of land, water, forests and wildlife; advantages and disadvantages for a business of becoming more sustainable. [BES, CAM]"],
  ["bus.operations.costs", "Business costs", "Fixed, variable, total and average costs, direct and indirect costs; calculating total variable cost, total cost and average cost; using cost data to make simple decisions (what to produce, whether to continue, what price to set, which supplier). [BES, CAM]"],
  ["bus.operations.economies-of-scale", "Economies and diseconomies of scale", "Purchasing, marketing, financial, managerial and technical economies of scale; diseconomies of scale (poor communication, low commitment of employees, weak coordination, lack of control). [CAM]"],
  ["bus.operations.break-even-calculation", "Break-even analysis: calculations", "The concept of break-even; contribution per unit (selling price minus variable cost per unit); calculating break-even output and break-even revenue; calculating and interpreting the margin of safety; the effect on break-even of changes in price, fixed costs and variable cost per unit. [BES, CAM]"],
  ["bus.operations.break-even-chart", "Break-even charts and the uses and limits of break-even", "Constructing, completing and amending a simple break-even chart (fixed cost, total cost and revenue lines); reading the break-even point, the profit and loss regions and the margin of safety from a chart; using break-even to make decisions; limitations of break-even analysis. Charts are described in words or tables. [BES, CAM]"],
  ["bus.operations.quality", "Quality of goods and services", "What quality means and why it matters; quality control and quality assurance and their advantages and disadvantages; total quality management (TQM), quality circles; recommending quality control or assurance for a business. [BES, CAM]"],
  ["bus.operations.location", "Location and relocation of a business", "Factors influencing the location of manufacturing and service businesses (raw materials, markets, transport, labour, power and water, government policy, competitors), deciding which country to operate in, and why businesses relocate (depletion of raw materials, dying markets, natural disasters, government policy); recommending a location. [BES, CAM]"],
  // Trade
  ["bus.trade.introduction", "Introduction to trade", "Why people trade; barter and its problems compared with trade using money; the branches of trade (home trade: retail and wholesale; foreign trade: imports, exports, entrepot) and the aids to trade (transport, communication, banking, insurance, warehousing, advertising). [COM]"],
  ["bus.trade.wholesale", "Wholesale trade, marketing boards and commodity markets", "Services of wholesalers to manufacturers, retailers and consumers; types of wholesaler (general, specialist, cash and carry, co-operative wholesale societies); why and how wholesalers are bypassed; marketing boards (for example the Grain Marketing Board) and their functions; commodity markets and their functions. [COM]"],
  ["bus.trade.retail-types", "Retail trade: functions and types of retailer", "Functions of retailers to producers, wholesalers and consumers; small-scale retailers (tuck shops, kiosks, market stalls, hawkers and vendors, mobile shops) and large-scale retailers (supermarkets, hypermarkets, chain stores, department stores), their characteristics and organisation; factors to consider when opening a retail outlet; why small-scale retailers survive. [COM]"],
  ["bus.marketing.ecommerce", "E-commerce and trends in retailing", "Trends in retailing (self-service, electronic point of sale, bar coding, vending machines, loyalty schemes) and e-commerce: online shopping, mobile phone and internet banking, online ticketing; advantages and disadvantages of e-commerce for businesses and for customers. [COM, CAM]"],
  ["bus.trade.credit", "Hire purchase, credit sales and other forms of credit", "Hire purchase and deferred payment (credit sale) agreements, credit cards and informal credit (for example credit from a local shop); main features, advantages and disadvantages, comparing hire purchase with deferred payment, and how hire purchase is financed. [COM]"],
  ["bus.trade.home-trade-documents", "Documents used in home trade, and trade and cash discounts", "Letter of enquiry, quotation, price list and catalogue, order, pro forma invoice, invoice, delivery and advice notes, debit and credit notes, statement of account and receipt: contents, purpose and sequence; trade discount and cash discount, their purposes and calculations (trade discount first, then cash discount). [COM]"],
  ["bus.trade.foreign-trade", "Foreign trade: reasons, difficulties and intermediaries", "Why countries trade (interdependence, specialisation, obtaining what cannot be produced at home); difficulties faced by importers and exporters (distance, currency, language, regulations, payment risk); entrepot trade; intermediaries in foreign trade (brokers, merchants, factors and agents) and how they differ. [COM]"],
  ["bus.trade.foreign-trade-documents", "Documents and customs in foreign trade", "Indent, consular invoice, letter of credit, bill of exchange, customs specification (declaration), certificate of origin, airway bill and bill of lading: purpose and key information; functions of customs authorities (the Zimbabwe Revenue Authority, ZIMRA): collecting duties, preventing smuggling, controlling bonded warehouses, collecting trade statistics. [COM]"],
  ["bus.trade.protectionism", "Free trade, protectionism, tariffs and quotas", "Free trade versus protection; methods of restricting trade (tariffs, quotas, embargoes, exchange control); reasons for protection; effects of import tariffs and quotas on businesses, consumers and the economy. [COM, CAM]"],
  ["bus.trade.trading-blocs", "Trading blocs and economic integration", "Economic integration and trading blocs such as SADC, COMESA, ECOWAS, the AU and the EU: aims, features, member states (examples), advantages and disadvantages, and effects on Zimbabwe's economy and businesses. [COM, BES]"],
  ["bus.trade.balance-of-payments", "Balance of trade and balance of payments", "Visible and invisible trade; calculating the balance of trade, the invisible balance and the balance of payments on current account; causes of a deficit and ways of correcting it. [COM]"],
  ["bus.trade.warehousing", "Warehousing: functions and importance", "What warehousing is, its functions (storage, protection, packing, breaking bulk, stabilising prices, seasonal supply) and importance to trade; indigenous storage systems (for example granaries: dura, isiphala, tsapi). [COM, BES]"],
  ["bus.trade.warehouse-types-location", "Types of warehouse and warehouse location", "Private warehouses (manufacturers', wholesalers', retailers'), public warehouses and bonded warehouses and their functions; factors to consider when locating a warehouse. [COM, BES]"],
  // Transport
  ["bus.transport.modes", "Importance of transport and modes of transport", "Why transport matters to commerce; the development of transport; road, rail, air, water and pipeline transport, their characteristics, advantages and disadvantages and suitable goods for each. [COM, BES]"],
  ["bus.transport.choice-documents", "Choosing a mode of transport, transport documents and ports", "Factors influencing the choice of transport (cost, speed, distance, nature and value of goods, safety, reliability, urgency, accessibility); transport documents (consignment note, delivery note, bill of lading, airway bill); the role of port authorities and how a landlocked country uses sea ports and inland (dry) ports. [COM, BES]"],
  ["bus.transport.trends", "Trends in transport", "Containerisation, toll gates, vehicle tracking systems, e-ticketing, satellite positioning (GPS), the growth of air cargo and the impact of ICT on transport, with advantages and disadvantages. [COM]"],
  // Consumer protection
  ["bus.consumer.rights", "Consumer rights, responsibilities and the need for protection", "Why consumers need protection and how they can be exploited (short measures, false descriptions, unsafe or expired goods, overpricing); consumer rights and responsible consumer behaviour. [COM]"],
  ["bus.consumer.organisations", "Consumer protection organisations", "Roles of consumer protection bodies such as the Consumer Council of Zimbabwe (CCZ) and the Standards Association of Zimbabwe (SAZ), and how consumers use them. [COM]"],
  ["bus.consumer.legal-protection", "Legal controls and government action to protect consumers", "Methods of protecting consumers: legislation against misleading promotion and faulty or unsafe goods, weights and measures, labelling, price controls, the role of government, and self-protection by consumers; effects of legal controls on businesses and their marketing. [COM, CAM]"],
  // Business organisations
  ["bus.organisation.purpose-sectors", "Purpose of business organisations; private and public sectors", "Why business organisations exist (meeting needs, employment creation, income, infrastructure and development); the private sector and the public sector, classifying business units into each; the formal and informal sectors. [COM, BES, CAM]"],
  ["bus.organisation.sole-traders-partnerships", "Sole traders and partnerships", "Features, formation, ownership and control of sole proprietorships and partnerships; the partnership deed; unlimited liability; advantages and disadvantages; setting up a sole proprietorship or partnership; recommending a form for given owners. [COM, BES, CAM]"],
  ["bus.organisation.limited-companies", "Private and public limited companies", "Features, ownership (shareholders) and control (directors) of private and public limited companies; differences between them; advantages and disadvantages; recommending a type of business organisation for a given situation. [COM, BES, CAM]"],
  ["bus.organisation.formation-liability", "Forming a company: legal personality, limited liability and documents", "Separate legal personality and limited liability and why they matter; risks of forming a new enterprise; documents for forming a company (memorandum of association, articles of association, certificate of incorporation, trading certificate, prospectus) and their contents. [COM, BES]"],
  ["bus.organisation.franchises-joint-ventures", "Franchises, joint ventures and social enterprises", "How franchises work, advantages and disadvantages for franchisor and franchisee; joint ventures and their advantages and disadvantages; social enterprises; comparing forms of business enterprise. [BES, CAM]"],
  ["bus.organisation.public-enterprises", "Public sector organisations", "Public corporations (parastatals), local authorities, government departments and public marketing boards: features, functions, ownership and control, merits and demerits. [COM, BES]"],
  ["bus.organisation.public-sector-reforms", "Commercialisation, privatisation and nationalisation", "Meaning of commercialisation, privatisation and nationalisation and the arguments for and against each. [COM]"],
  ["bus.organisation.multinationals", "Multinational companies", "Features of multinational companies (MNCs); why a business becomes an MNC; advantages and disadvantages for the host country (jobs, exports, investment, choice; competition, environmental damage, exploitation of resources, repatriation of profits) and for the home country. [COM, CAM]"],
  ["bus.organisation.smes", "Small to medium enterprises", "Features of small to medium enterprises (SMEs), including informal-sector and home-industry businesses; their importance to Zimbabwe's economy; the challenges they face; government programmes and assistance for SMEs (for example grants, loans, workspace at home-industry sites). [COM, BES]"],
  ["bus.organisation.associations", "Traders' associations and business membership organisations", "Traders' associations (for example associations of vendors or booksellers) and business membership organisations such as the Zimbabwe National Chamber of Commerce (ZNCC), the Confederation of Zimbabwe Industries (CZI) and ZimTrade: functions and importance. [COM]"],
  // Enterprise
  ["bus.enterprise.entrepreneurship", "Enterprise and entrepreneurs", "Meaning of enterprise, enterprising and entrepreneur (enterpriser); skills and personal qualities of successful entrepreneurs (leadership, innovation, creativity, risk-taking, determination); benefits and drawbacks of being an entrepreneur; importance of enterprise to the economy. [COM, BES, CAM]"],
  ["bus.enterprise.role-drivers", "The role of the enterpriser and drivers towards enterprise", "What an enterpriser does (scanning the environment, identifying opportunities, mobilising and allocating resources, setting up and managing the business) and what drives people to start enterprises (government policy, demographic and economic change, self-actualisation, community role models). [BES]"],
  ["bus.enterprise.opportunities-risks", "Business opportunities and risks", "How business opportunities arise (unmet demand, new technology, research and development, changes in tastes, population and real income, globalisation, government policy) and the risks enterprisers face; judging the likelihood and impact of a risk. [BES]"],
  ["bus.enterprise.start-up-support", "Support for new businesses", "Why new enterprises need support and why governments support start-ups; how they are supported (grants, low-cost loans, advice, training schemes, help from family and friends, fundraising). [BES, CAM]"],
  ["bus.enterprise.business-plan", "The business plan", "Purpose and importance of a business plan; its main sections (executive summary, business background, products, market research and analysis, marketing, operations, management and people, financial plan); drafting a simple business plan. [COM, BES, CAM]"],
  ["bus.enterprise.planning-process", "The business planning process and implementing a plan", "Steps in business planning: purpose (destiny, cause and calling), setting objectives, generating, evaluating and selecting options, implementation, review and control; implementing and managing a business plan on a project. [BES]"],
  ["bus.enterprise.objectives", "Business objectives", "Objectives such as survival, growth, profit, sales revenue, market share, corporate social responsibility and ethical aims; why objectives are important and how they change. [BES, CAM]"],
  ["bus.enterprise.stakeholders", "Stakeholders", "Internal stakeholders (owners, managers, employees) and external stakeholders (customers, suppliers, lenders, government, local community, competitors); their roles and objectives; how stakeholder objectives conflict. [BES, CAM]"],
  ["bus.enterprise.business-size", "Measuring business size; small and large businesses", "Methods of measuring business size (number of employees, value or volume of output or sales, capital employed; not profit) and their problems; advantages and disadvantages of being small or large; why some businesses remain small. [BES, CAM]"],
  ["bus.enterprise.business-growth", "Business growth", "Why owners want growth; factors influencing growth; internal growth (new products, new markets) and external growth (mergers, takeovers; horizontal and vertical integration); advantages and disadvantages of each method; problems and effects of growth. [BES, CAM]"],
  ["bus.enterprise.success-failure", "Why businesses succeed or fail", "Causes of business failure (poor management, poor record keeping, lack of finance, unsuitable product, low demand, economic change, competition) and of success, and solutions to the causes of failure. [BES, CAM]"],
  ["bus.enterprise.ethics", "Business ethics and social responsibility", "Ethical issues in business (fair wages, fair prices to suppliers, child labour, honest advertising, bribery, environmentally responsible suppliers); the role and importance of ethics to business and society; corporate social responsibility; advantages and disadvantages of being ethical. [COM, BES, CAM]"],
  ["bus.enterprise.intellectual-property", "Intellectual property", "Types of intellectual property (patents, trademarks, copyright, industrial designs, geographical indications); why they are protected; infringements such as piracy and plagiarism and their remedies; functions of the Zimbabwe patents office, ARIPO and WIPO. [COM]"],
  // Business environment
  ["bus.environment.business-environment", "The business environment: internal and external factors", "Internal environment (owners, employees, resources, management, culture) and external environment (customers, suppliers, competitors; political, economic, social, technological, legal and ecological factors); business constraints; SWOT analysis; how each factor affects a business. [COM, BES]"],
  ["bus.environment.resources-capabilities", "Resources and capabilities of an enterprise", "Tangible resources (land, water, forests, buildings, capital) and intangible resources (knowledge, skills, expertise, reputation); capabilities; why resources and capabilities are analysed; ways of acquiring and owning resources. [BES]"],
  // External influences (economy)
  ["bus.economy.business-cycle", "The business cycle and economic change", "Stages of the business cycle (growth, boom, recession, slump) and how each affects businesses; effects of changes in employment, inflation and economic growth on a business. [CAM]"],
  ["bus.economy.government-policy", "Effects of government economic policy", "Effects of changes in taxes (on profits and on people's income), government spending and interest rates on businesses, and how businesses may respond. [CAM]"],
  ["bus.economy.globalisation", "Globalisation", "Reasons for globalisation (transport links, technology and communication, free trade agreements, newly industrialised countries) and the opportunities and threats it brings to businesses. [CAM]"],
  ["bus.economy.exchange-rates", "Exchange rates", "Appreciation and depreciation of an exchange rate and how changes affect importers and exporters (prices, costs, competitiveness); converting amounts between currencies at a given rate (ZIMSEC Commerce only: Cambridge does not assess exchange-rate calculations). [COM, CAM]"],
  ["bus.economy.external-costs-benefits", "External costs and benefits", "External (social) costs and benefits of business decisions, such as a new factory or mine, for the community and the environment. [CAM]"],
  ["bus.economy.environmental-issues", "Business and the environment", "How business activity can damage the environment (pollution, depletion of resources); why and how businesses respond to environmental issues; effects of legal controls on what, how and where businesses produce or sell, and on costs. [CAM]"],
  ["bus.economy.pressure-groups", "Pressure groups", "What pressure groups are and how they influence business decisions (publicity, boycotts, lobbying), and how businesses respond. [CAM]"],
  // People in business
  ["bus.people.management-functions", "The functions of management and delegation", "Planning, organising, commanding (directing, leading), coordinating and controlling; the importance of each; advantages and disadvantages of delegation. [COM, BES, CAM]"],
  ["bus.people.organisational-structure", "Organisational structure", "Functional areas (operations, marketing, finance, human resources); hierarchy, tall and flat structures, chain of command and span of control; reading simple organisation charts; flexible working (home working, flexible hours); part-time and full-time employees. [BES, CAM]"],
  ["bus.people.leadership", "Leadership", "Qualities of a good leader; autocratic, democratic and laissez-faire leadership styles, their advantages and disadvantages, and recommending a style for a situation. [BES, CAM]"],
  ["bus.people.motivation-theories", "Why people work and motivation theories", "Why people work; benefits of a well-motivated workforce (productivity, lower absenteeism and labour turnover, acceptance of change); the theories of Maslow, Taylor and Herzberg (and McGregor's Theory X and Theory Y for ZIMSEC) and how they apply to businesses. [BES, CAM]"],
  ["bus.people.motivation-methods", "Financial and non-financial methods of motivation", "Financial methods (time rate, piece rate, salary, bonus, commission, profit sharing, fringe benefits) and non-financial methods (job enrichment, job rotation, training, promotion, praise, employee of the month); recommending a method for a situation. [BES, CAM]"],
  ["bus.people.recruitment-selection", "Recruitment and selection", "The recruitment process (job description, person specification, job advertisement, employment agencies, online recruitment); internal and external recruitment; selection methods (CV, application form, references, tests, interviews); recommending whom to employ. [CAM]"],
  ["bus.people.employment-contracts", "Employment contracts and legal controls over employment", "Main contents of an employment contract and its benefits to employer and employee; legal controls over unfair dismissal, discrimination, health and safety and minimum wages, and their effects on employers and employees. [CAM]"],
  ["bus.people.training", "Training", "Importance of training to a business and to employees; induction, on-the-job and off-the-job training and their advantages and disadvantages. [CAM]"],
  ["bus.people.workforce-reduction", "Downsizing and redundancy", "Downsizing and why a business may reduce its workforce (automation, lower demand, cutting costs); redundancy compared with dismissal; deciding which employees to make redundant. [CAM]"],
  ["bus.people.trade-unions", "Trade unions", "What a trade union is and the benefits to employees of membership. [CAM]"],
  // Communication
  ["bus.communication.methods", "Communication in business: importance and methods", "Meaning and importance of communication; internal and external communication; oral, written, visual and electronic methods (meetings, letters, memos, notices, phone calls, text messages, email, social media); advantages and disadvantages; factors in choosing a method (cost, urgency, reliability, need for a record); recommending a method. [COM, BES, CAM]"],
  ["bus.communication.barriers", "Effective communication and communication barriers", "What makes communication effective (enhancers); examples and causes of barriers (jargon, language, noise, poor channels, attitudes, too long a chain of command); problems they cause and how to reduce or remove them. [COM, CAM]"],
  ["bus.communication.telecommunications", "Telecommunication services and service providers", "Telecommunication devices and services (fixed telephone, mobile phone, internet, data services); advantages and disadvantages; types of service provider (fixed-line operators, mobile network operators, internet service providers) and the services they offer, with Zimbabwean examples. [COM]"],
  ["bus.communication.postal-services", "Postal and courier services", "Agents of postal services (the national postal service and courier companies); services such as registered mail, recorded delivery, cash on delivery, poste restante, business reply service, freepost, franking machines and express mail; their importance and drawbacks. [COM]"],
  ["bus.communication.formal-informal-trends", "Formal and informal communication and trends in business communication", "Formal communication (business letters, memoranda, reports) and informal communication (the grapevine); advantages and disadvantages; drafting a business letter; trends such as email, video calls, social media and instant messaging, and the impact of ICT on business communication. [COM, BES]"],
  // Marketing
  ["bus.marketing.role-concepts", "The role of marketing and marketing concepts", "Why marketing is needed: identifying and satisfying customer needs, customer loyalty and relationships, anticipating change; the production, product, selling and marketing concepts and their implications for a business. [COM, BES, CAM]"],
  ["bus.marketing.demand-supply", "Markets, demand and supply", "Meaning of market, product, demand and supply; how demand and supply interact to set price, shown in simple diagrams described in words or tables. [BES]"],
  ["bus.marketing.market-changes", "Changing markets and market share", "Why consumer spending patterns change, why markets become more competitive, how businesses respond; calculating market share. [CAM]"],
  ["bus.marketing.types-of-markets", "Types of markets: physical and virtual", "Physical and virtual (online) markets, local, regional and global markets; their features, advantages and disadvantages. [COM, BES]"],
  ["bus.marketing.mass-niche", "Mass and niche markets", "Mass marketing and niche marketing: concepts, advantages and disadvantages. [COM, CAM]"],
  ["bus.marketing.segmentation", "Market segmentation", "Segmenting markets by age, income, location, gender, lifestyle and interests; reasons for segmentation; advantages and disadvantages. [COM, BES, CAM]"],
  ["bus.marketing.market-research", "Market research", "Why businesses carry out market research; primary methods (questionnaires, surveys, interviews, focus groups, observation) and secondary sources; qualitative and quantitative data; sampling; designing data-collection tools; presenting and interpreting results in tables and charts; accuracy of research data. [BES, CAM]"],
  ["bus.marketing.demand-forecasting", "Demand forecasting", "Why businesses forecast demand and simple qualitative and quantitative methods of forecasting (opinion of sales staff and experts, consumer surveys, trends from past sales). [BES]"],
  ["bus.marketing.product", "Product: branding, packaging and new products", "The product element of the marketing mix: brand image, the roles of packaging, developing new products and its advantages and disadvantages. [COM, BES, CAM]"],
  ["bus.marketing.product-life-cycle", "The product life cycle and extension strategies", "Stages of the product life cycle (introduction, growth, maturity, decline), interpreting a product life cycle diagram, extension strategies and their advantages and disadvantages; recommending an extension strategy. [COM, BES, CAM]"],
  ["bus.marketing.price", "Pricing methods", "Cost-plus, competitive, penetration, skimming and dynamic pricing; advantages and disadvantages; recommending a pricing method. [COM, BES, CAM]"],
  ["bus.marketing.place", "Place: channels of distribution", "Channels of distribution from producer to consumer (direct, through retailers, through wholesalers and retailers, through agents); factors in choosing a channel; recommending a channel. [COM, BES, CAM]"],
  ["bus.marketing.promotion", "Promotion: advertising and sales promotion", "Reasons for promotion; advertising (informative and persuasive; media such as radio, television, newspapers, billboards, leaflets, social media, targeted messages) and sales promotion (vouchers, loyalty and reward schemes, competitions, special offers, free samples); choosing promotion methods and designing an advertisement. [COM, BES, CAM]"],
  ["bus.marketing.marketing-strategy", "Marketing strategy: the marketing mix together", "The importance of each element of the marketing mix (product, price, place, promotion) and how they fit together; evaluating the impact of the mix; recommending an appropriate marketing mix for a given situation. [COM, BES, CAM]"],
  ["bus.marketing.foreign-markets", "Entering foreign markets", "Advantages of selling in other countries (more sales, spreading risk) and the challenges (cultural differences, lack of knowledge, legal requirements, payment and currency), and ways of reducing them. [BES, CAM]"],
  // Finance and banking
  ["bus.finance.money", "Money and inflation", "Origins of money and the problems of barter; characteristics (qualities) and functions of money; causes and effects of inflation. [COM]"],
  ["bus.finance.income-saving-investment", "Personal income, saving and investment", "Sources of personal income; saving and methods of saving; reasons for saving; personal investments (for example savings accounts, shares, property, livestock) and reasons for investing; the difference between saving and investment. [COM, BES]"],
  ["bus.finance.personal-budgeting-borrowing", "Personal budgets, borrowing and financial advice", "Drawing up a personal budget; reasons for borrowing and when not to borrow; borrowing options (overdraft, bank loan, trade credit, informal lenders); sources of financial advice; consequences of financial mismanagement. [COM]"],
  ["bus.finance.taxation", "Taxation", "Why governments tax; direct and indirect taxes (for example income tax, corporate tax, value added tax, customs and excise duties); the legal obligation to pay tax; the role of the Zimbabwe Revenue Authority (ZIMRA). [COM]"],
  ["bus.finance.commercial-banks", "The banking system and commercial banks", "Classification of banks; services of commercial banks: current and savings accounts, loans and overdrafts, bank cards, cheques, electronic transfers (including RTGS), automated teller machines, standing orders and other services; filling in banking documents. [COM, BES]"],
  ["bus.finance.other-institutions", "Other financial institutions", "Merchant banks, finance houses, discount houses, building societies, the post office savings bank, development and small-enterprise finance institutions and microfinance institutions: the services each provides. [COM, BES]"],
  ["bus.finance.reserve-bank", "The Reserve Bank of Zimbabwe", "Functions of a central bank and of the Reserve Bank of Zimbabwe (issuing notes and coins, banker to the government and to commercial banks, lender of last resort, monetary policy, supervising banks, managing foreign reserves). [COM]"],
  ["bus.finance.banking-trends", "Trends in banking", "Telebanking, internet banking, mobile banking and mobile money, agency banking and money transfer agents; their impact on customers, banks and economic activity. [COM]"],
  ["bus.finance.international-institutions", "International financial institutions", "International financial institutions such as the World Bank (International Bank for Reconstruction and Development), the International Monetary Fund and regional development banks: roles and their activities in developing countries such as Zimbabwe. [COM]"],
  ["bus.finance.need-for-finance", "Why businesses need finance", "Start-up capital, expansion, replacing non-current assets, new technology and working capital; short-term and long-term finance needs; long-term and short-term capital. [COM, BES, CAM]"],
  ["bus.finance.sources", "Sources of finance and choosing a source", "Internal sources (owners' savings, retained profit, sale of assets, working capital) and external sources (share capital, loans, overdrafts, trade credit, leasing, hire purchase, debentures, venture capital, government grants, crowdfunding, family, friends and community sources); advantages and disadvantages; factors in choosing a source; recommending a source. [COM, BES, CAM]"],
  ["bus.finance.shares-debentures", "Shares and debentures", "Ordinary and preference shares, debentures, the differences between shares and debentures and between ordinary and preference shares, and types of capital (authorised, issued, called-up, paid-up). [COM]"],
  ["bus.finance.stock-exchange", "The Zimbabwe Stock Exchange", "Functions and importance of a stock exchange and the Zimbabwe Stock Exchange (ZSE) to the economy; stockbrokers and jobbers (market makers); speculators (bulls, bears and stags). [COM]"],
  ["bus.finance.securing-investors", "Securing investors", "How enterprises attract investors: a favourable policy environment, good corporate governance, a reputable brand, a sound business plan and track record. [BES]"],
  ["bus.finance.working-capital", "Working capital", "Meaning and calculation of working capital (current assets minus current liabilities); the working capital cycle; why managing working capital matters and ways of managing it. [COM, BES, CAM]"],
  ["bus.finance.cash-flow-forecast", "Cash flow forecasts and cash budgets", "Main features of a cash flow forecast (cash budget): inflows, outflows, net cash flow, opening and closing balances; completing, amending and interpreting a forecast (ZIMSEC learners also prepare a simple cash budget). [BES, CAM]"],
  ["bus.finance.cash-flow-problems", "Cash and solving cash-flow problems", "Why cash matters to a business; the difference between cash and profit; causes of short-term cash-flow problems and ways to overcome them (overdraft, delaying payments to suppliers, asking customers to pay sooner, delaying purchases of non-current assets). [BES, CAM]"],
  ["bus.finance.budgets", "Budgeting and budgets", "Budgeting and budgets; types of budget (cash, sales, production, purchases); preparing a simple budget for an enterprise; importance and limits of budgeting. [BES]"],
  ["bus.finance.profit", "Profit and why it matters", "What profit is (revenue minus costs) and why profit matters to private-sector businesses: reward for risk-taking, source of finance, measure of success, attracting investors. [BES, CAM]"],
  ["bus.finance.income-statement", "The income statement (statement of profit or loss)", "Main features of an income statement (revenue, cost of sales, gross profit, expenses, profit); simple calculations from it and decisions based on it (ZIMSEC learners also prepare a simple one). [BES, CAM]"],
  ["bus.finance.financial-position", "The statement of financial position", "Non-current and current assets, non-current and current liabilities, capital employed; calculating total assets, total liabilities and working capital; decisions based on the statement (ZIMSEC learners also prepare a simple one). [BES, CAM]"],
  ["bus.finance.trading-calculations", "Business calculations: turnover, profit, stock turn, mark-up and margin", "Turnover, cost of goods sold, gross profit and net profit, average stock and the rate of stock turnover, mark-up and margin and converting between them; interpreting the results. [COM]"],
  ["bus.finance.profitability-ratios", "Profitability ratios", "Gross profit margin, profit (net profit) margin and return on capital employed (ROCE): calculating and interpreting them and comparing results over time or between businesses. [COM, CAM]"],
  ["bus.finance.liquidity-ratios", "Liquidity ratios", "The concept of liquidity; current ratio and acid test ratio, calculating and interpreting them. [CAM]"],
  ["bus.finance.users-of-accounts", "Users of accounts and limits of ratio analysis", "Internal and external users of accounts and ratio analysis and the decisions they make with them (whether to lend, invest or supply); limitations of accounts and ratio analysis. [CAM]"],
  // Insurance and assurance
  ["bus.insurance.nature-purpose", "Nature and purpose of insurance and assurance", "Insurance and assurance and the difference between them; business and life risks; insurable and non-insurable risks; pooling of risks; the use of statistics in setting premiums; communal systems of insurance such as zunde ramambo (isiphala senkosi) and burial societies. [COM]"],
  ["bus.insurance.principles", "Principles of insurance", "Utmost good faith, insurable interest, indemnity and proximate cause (with subrogation and contribution as consequences of indemnity), applied to examples. [COM]"],
  ["bus.insurance.procedures-documents", "Insurance procedures, documents and people", "Taking out a policy (proposal form, prospectus, premium, cover note, policy) and making a claim (claim form, assessment, settlement); the roles of brokers, underwriters, actuaries and loss assessors. [COM]"],
  ["bus.insurance.insurance-policies", "Types of insurance policy", "Policies such as fire, burglary and theft, motor, goods in transit, marine, fidelity guarantee, public liability and employer's liability: what each covers and which risks a business should insure. [COM]"],
  ["bus.insurance.assurance-social-security", "Assurance policies, social security and export credit insurance", "Whole life, endowment, term and funeral assurance and medical aid; benefits of assurance; why the National Social Security Authority (NSSA) was formed and what it provides; the purpose of export credit guarantee insurance (the Export Credit Guarantee Corporation). [COM]"],
  ["bus.insurance.ict", "ICT in insurance and assurance", "E-insurance and e-assurance (online quotations, policies, premium payments and claims); advantages and disadvantages of ICT in insurance for firms and clients. [COM]"],
];
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));
if (CONCEPT_KEYS.size !== CONCEPTS.length) throw new Error("duplicate concept key in registry");

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase; their codes add .n to the node code.
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((text, i) => ({ code: `${code}.${i + 1}`, text }));
  if (components) n.components = components;
  if (children) n.children = children;
  return n;
};
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level Commerce, Forms 1-4, 2015-2022. Topic numbers 6.1-6.11 are the scope-and-sequence numbers printed in
// the document; sub-topic codes (6.1.1, ...) are ours. Form in which each sub-topic is taught is in its description.
const COMMERCE_TOPICS = [
  topic("production", "6.1", "Production", {
    children: [
      sub("production.stages-factors", "6.1.1", "Stages and factors of production", {
        description: "Form 1: the need for production, goods and services, primary, secondary and tertiary production, factors of production and how commerce relates to production.",
        covers: ["bus.production.business-activity", "bus.production.sectors"],
        objectives: [
          "Explain why people need production and classify goods and services.",
          "Describe primary, secondary and tertiary production and the chain of production.",
          "Describe the factors of production and their rewards.",
          "Explain how commerce is related to production.",
        ],
      }),
      sub("production.ownership", "6.1.2", "Ownership of the means of production", {
        description: "Form 1: the means of production as heritage, land reform and indigenisation.",
        covers: ["bus.production.ownership-indigenisation"],
        objectives: [
          "Explain why local ownership of the means of production is important.",
          "Describe the significance of land as heritage and of land reform and indigenisation for the economy.",
        ],
      }),
      sub("production.forms", "6.1.3", "Forms of production, division of labour and mass production", {
        description: "Form 2: direct and indirect production, division of labour and specialisation, mass production.",
        covers: ["bus.production.division-of-labour"],
        objectives: [
          "Distinguish between direct and indirect production.",
          "Explain the advantages and disadvantages of division of labour and specialisation.",
          "Describe mass production.",
        ],
      }),
      sub("production.distribution", "6.1.4", "Chain of distribution", {
        description: "Form 2: channels by which goods reach consumers and how a channel is chosen.",
        covers: ["bus.marketing.place"],
        objectives: [
          "Describe the ways in which goods are distributed from producers to consumers.",
          "Identify factors considered when choosing a channel of distribution.",
        ],
      }),
      sub("production.value-addition", "6.1.5", "Value addition and beneficiation", {
        description: "Form 3: adding value at each stage of production and the benefits of exploiting local resources.",
        covers: ["bus.production.value-addition"],
        objectives: [
          "Explain value addition and beneficiation and how value is added at each stage of production.",
          "Explain how the community and the country benefit when local resources are processed.",
        ],
      }),
      sub("production.environment", "6.1.6", "Business environment", {
        description: "Form 4: internal and external factors affecting a business.",
        covers: ["bus.environment.business-environment"],
        objectives: [
          "Describe the business environment and its internal and external elements.",
          "Explain how political, economic, social and technological factors affect a business.",
        ],
      }),
    ],
  }),
  topic("trade", "6.2", "Trade", {
    children: [
      sub("trade.introduction", "6.2.1", "Introduction to trade", {
        description: "Form 1: reasons for trade, barter and monetary trade, home and foreign trade, branches of trade.",
        covers: ["bus.trade.introduction"],
        objectives: [
          "Explain why trade is needed.",
          "Compare barter with trade that uses money.",
          "Compare home trade and foreign trade and illustrate the branches of trade.",
        ],
      }),
      sub("trade.wholesale", "6.2.2", "Wholesale trade", {
        description: "Form 1: services of wholesalers, types of wholesaler, bypassing the wholesaler, marketing boards and commodity markets.",
        covers: ["bus.trade.wholesale"],
        objectives: [
          "Explain the services wholesalers give to manufacturers, retailers and consumers.",
          "Describe types of wholesaler, including cash and carry and co-operative wholesale societies.",
          "Explain why the wholesaler is sometimes bypassed.",
          "Describe the functions of marketing boards and commodity markets.",
        ],
      }),
      sub("trade.retail", "6.2.3", "Retail trade", {
        description: "Form 2: functions and types of retailers, establishing a retail outlet, trends in retailing and the survival of small-scale retailers.",
        covers: ["bus.trade.retail-types", "bus.marketing.ecommerce"],
        objectives: [
          "Explain the functions of retailers.",
          "Distinguish between large-scale and small-scale retailers and describe their characteristics.",
          "Describe factors to consider when setting up a retail outlet.",
          "Discuss the impact of trends in retailing such as electronic point of sale, bar coding, vending machines and e-commerce.",
          "Discuss why small-scale retailers survive.",
        ],
      }),
      sub("trade.credit", "6.2.4", "Hire purchase and deferred payments", {
        description: "Form 2: hire purchase, deferred payment, credit cards and informal credit.",
        covers: ["bus.trade.credit"],
        objectives: [
          "Explain the main features of hire purchase and deferred payment and compare them.",
          "Identify how hire purchase and credit sales are financed.",
          "Discuss the advantages and disadvantages of buying on credit.",
        ],
      }),
      sub("trade.documents", "6.2.5", "Discounts and documents used in home trade", {
        description: "Form 2: trade and cash discounts; the documents used in home trade, their contents and functions.",
        covers: ["bus.trade.home-trade-documents"],
        objectives: [
          "Explain the purposes of trade and cash discounts, distinguish them and calculate them.",
          "Identify the documents used in home trade and list the contents of each.",
          "Explain the function of each document and complete simple trade documents.",
        ],
      }),
      sub("trade.foreign", "6.2.6", "Foreign trade", {
        description: "Form 3: interdependence of countries, problems of importers and exporters, entrepot trade, free trade and protection, customs authorities, trading blocs, documents and intermediaries.",
        covers: ["bus.trade.foreign-trade", "bus.trade.foreign-trade-documents", "bus.trade.protectionism", "bus.trade.trading-blocs"],
        objectives: [
          "Identify the difficulties faced by importers and exporters and explain entrepot trade.",
          "Explain free trade and protectionism and identify methods of restricting trade.",
          "Analyse the functions of customs authorities.",
          "Describe trading blocs and analyse their benefits and challenges.",
          "Describe the purpose and key information of documents used in foreign trade.",
          "Explain the functions of intermediaries in foreign trade and distinguish between them.",
        ],
      }),
      sub("trade.balance-of-payments", "6.2.7", "Balance of payments", {
        description: "Form 4: visible and invisible trade, balance of trade and balance of payments, exchange rates.",
        covers: ["bus.trade.balance-of-payments", "bus.economy.exchange-rates"],
        objectives: [
          "Calculate the balance of trade, the invisible balance and the balance of payments.",
          "Outline ways of correcting a balance of payments deficit.",
          "Convert currencies using exchange rates.",
        ],
      }),
    ],
  }),
  topic("consumer", "6.3", "Consumer protection", {
    children: [
      sub("consumer.rights", "6.3.1", "Reasons for consumer protection; consumer rights and responsibilities", {
        description: "Form 1.",
        covers: ["bus.consumer.rights"],
        objectives: [
          "Identify areas in which consumers need protection and ways in which they can be exploited.",
          "Explain consumer rights and the responsibilities of consumers.",
        ],
      }),
      sub("consumer.boards", "6.3.2", "Consumer protection boards", {
        description: "Form 2: bodies such as the Consumer Council of Zimbabwe and the Standards Association of Zimbabwe.",
        covers: ["bus.consumer.organisations"],
        objectives: ["Identify consumer protection bodies and explain their roles."],
      }),
      sub("consumer.methods", "6.3.3", "Methods of protecting consumers and the role of government", {
        description: "Form 3.",
        covers: ["bus.consumer.legal-protection"],
        objectives: [
          "Discuss methods of protecting consumers, including legislation.",
          "Explain the role of government in consumer protection.",
          "Identify how consumers can protect themselves.",
        ],
      }),
    ],
  }),
  topic("organisations", "6.4", "Business organisations", {
    children: [
      sub("organisations.importance", "6.4.1", "Importance of business organisations; business sectors", {
        description: "Form 1: private and public sectors and the business units in each.",
        covers: ["bus.organisation.purpose-sectors"],
        objectives: [
          "Justify the importance of business organisations.",
          "Describe the private and public sectors and classify business units into them.",
        ],
      }),
      sub("organisations.unincorporated", "6.4.2", "Unincorporated business units", {
        description: "Form 2: sole proprietorships and partnerships.",
        covers: ["bus.organisation.sole-traders-partnerships"],
        objectives: [
          "Explain the features, formation, ownership and control of unincorporated businesses.",
          "Examine the advantages and disadvantages of unincorporated business units.",
          "Distinguish between a sole proprietorship and a partnership.",
        ],
      }),
      sub("organisations.incorporated", "6.4.3", "Incorporated business units", {
        description: "Form 3: private and public limited companies, their formation and documents.",
        covers: ["bus.organisation.limited-companies", "bus.organisation.formation-liability"],
        objectives: [
          "State the types of incorporated business units and describe their formation, ownership and control.",
          "Distinguish between private and public limited companies.",
          "Outline the advantages and disadvantages of incorporated business units.",
        ],
      }),
      sub("organisations.multinationals", "6.4.4", "Multinational corporations", {
        description: "Form 3.",
        covers: ["bus.organisation.multinationals"],
        objectives: [
          "Explain the features, advantages and disadvantages of multinational corporations.",
          "Assess the impact of multinational corporations on the host and the parent country.",
        ],
      }),
      sub("organisations.public-sector", "6.4.5", "Public sector business units", {
        description: "Form 3: public corporations, local authorities and marketing boards.",
        covers: ["bus.organisation.public-enterprises"],
        objectives: [
          "State the functions of public sector organisations.",
          "Outline the merits and demerits of public enterprises.",
        ],
      }),
      sub("organisations.associations", "6.4.6", "Traders' associations and business membership organisations", {
        description: "Form 4.",
        covers: ["bus.organisation.associations"],
        objectives: [
          "Identify traders' associations and explain their functions.",
          "Explain the importance of business membership organisations.",
        ],
      }),
      sub("organisations.smes", "6.4.7", "Small to medium enterprises", {
        description: "Form 4.",
        covers: ["bus.organisation.smes"],
        objectives: [
          "Describe the features of small to medium enterprises and explain their importance.",
          "Outline the challenges faced by small to medium enterprises.",
          "Evaluate government programmes for small to medium enterprises.",
        ],
      }),
      sub("organisations.reforms", "6.4.8", "Public sector reforms", {
        description: "Form 4: commercialisation, privatisation and nationalisation.",
        covers: ["bus.organisation.public-sector-reforms"],
        objectives: [
          "Define commercialisation, privatisation and nationalisation.",
          "Explain the reasons for and against each reform.",
        ],
      }),
    ],
  }),
  topic("enterprise", "6.5", "Enterprise", {
    children: [
      sub("enterprise.introduction", "6.5.1", "Introduction to enterprise", {
        description: "Form 1: qualities of an entrepreneur and the importance of enterprise skills.",
        covers: ["bus.enterprise.entrepreneurship"],
        objectives: [
          "Identify the qualities of an entrepreneur.",
          "Explain the advantages and disadvantages of being an entrepreneur.",
          "Evaluate the importance of enterprise skills to the economy.",
        ],
      }),
      sub("enterprise.management", "6.5.2", "Management functions", {
        description: "Form 2.",
        covers: ["bus.people.management-functions"],
        objectives: [
          "Explain the functions of management such as planning, organising, directing and controlling.",
          "Explain the importance of each management function.",
        ],
      }),
      sub("enterprise.ethics", "6.5.3", "Business ethics", {
        description: "Form 2.",
        covers: ["bus.enterprise.ethics"],
        objectives: [
          "Identify ethical considerations in business.",
          "Explain the role and importance of ethics in business and society.",
        ],
      }),
      sub("enterprise.business-plan", "6.5.4", "Business plan", {
        description: "Form 3.",
        covers: ["bus.enterprise.business-plan"],
        objectives: [
          "Describe the layout and contents of a business plan and its importance.",
          "Design a business plan for a business idea.",
        ],
      }),
      sub("enterprise.intellectual-property", "6.5.5", "Intellectual property", {
        description: "Form 3.",
        covers: ["bus.enterprise.intellectual-property"],
        objectives: [
          "Explain the types of intellectual property and why they are protected.",
          "Suggest solutions to infringements of intellectual property.",
          "Describe the functions of the national patents office and regional and international property organisations.",
        ],
      }),
    ],
  }),
  topic("finance", "6.6", "Finance and banking", {
    children: [
      sub("finance.personal", "6.6.1", "Personal finance", {
        description: "Form 1: sources of income, saving and personal investment.",
        covers: ["bus.finance.income-saving-investment"],
        objectives: [
          "Explain the sources of personal income.",
          "State methods of saving and justify the need to save.",
          "Identify methods of personal investment and analyse reasons for investing.",
        ],
      }),
      sub("finance.money", "6.6.2", "Money", {
        description: "Form 1: origins, characteristics and functions of money; inflation.",
        covers: ["bus.finance.money"],
        objectives: [
          "Trace the origins of money.",
          "Describe the characteristics of money and outline its functions.",
          "Discuss the causes and effects of inflation.",
        ],
      }),
      sub("finance.managing-personal", "6.6.3", "Managing personal finances", {
        description: "Form 2: budgeting, borrowing options, financial advice and financial mismanagement.",
        covers: ["bus.finance.personal-budgeting-borrowing"],
        objectives: [
          "Draw up a personal budget.",
          "Discuss reasons for borrowing and identify borrowing options.",
          "Analyse the need for financial advice and the consequences of financial mismanagement.",
        ],
      }),
      sub("finance.taxation", "6.6.4", "Taxation", {
        description: "Form 2.",
        covers: ["bus.finance.taxation"],
        objectives: ["Recognise the legal obligation to pay tax and discuss personal taxes."],
      }),
      sub("finance.banks", "6.6.5", "The banking system and commercial banks", {
        description: "Form 2: classification of banks and commercial banking services.",
        covers: ["bus.finance.commercial-banks"],
        objectives: [
          "Identify different types of banks.",
          "Describe the services offered by commercial banks.",
          "Complete banking documents such as cheques, deposit slips and withdrawal slips.",
        ],
      }),
      sub("finance.business-finance", "6.6.6", "Business finance", {
        description: "Form 3: sources of finance, long-term and short-term capital, shares and debentures.",
        covers: ["bus.finance.need-for-finance", "bus.finance.sources", "bus.finance.shares-debentures"],
        objectives: [
          "Describe and evaluate the sources of business finance.",
          "Explain long-term and short-term capital.",
          "Distinguish between shares and debentures and between ordinary and preference shares.",
        ],
      }),
      sub("finance.other-institutions", "6.6.7", "Other financial institutions", {
        description: "Form 3: merchant banks, finance houses, discount houses, building societies, savings banks and small-enterprise finance institutions.",
        covers: ["bus.finance.other-institutions"],
        objectives: ["Outline the services provided by each financial institution."],
      }),
      sub("finance.reserve-bank", "6.6.8", "The Reserve Bank of Zimbabwe", {
        description: "Form 3.",
        covers: ["bus.finance.reserve-bank"],
        objectives: ["Describe and analyse the functions of the Reserve Bank of Zimbabwe."],
      }),
      sub("finance.calculations", "6.6.9", "Business calculations", {
        description: "Form 4: working capital, gross and net profit, rate of stock turnover, return on capital employed, mark-up and margin.",
        covers: ["bus.finance.trading-calculations", "bus.finance.profitability-ratios", "bus.finance.working-capital"],
        objectives: [
          "Define and calculate working capital, gross profit, net profit, turnover and the rate of stock turnover.",
          "Calculate return on capital employed.",
          "Calculate profit margin and mark-up.",
        ],
      }),
      sub("finance.stock-exchange", "6.6.10", "Zimbabwe Stock Exchange", {
        description: "Form 4.",
        covers: ["bus.finance.stock-exchange"],
        objectives: [
          "Assess the importance of the Zimbabwe Stock Exchange to the economy.",
          "Explain the roles of speculators and outline the functions of brokers and jobbers.",
        ],
      }),
      sub("finance.banking-trends", "6.6.11", "Trends in banking", {
        description: "Form 4: telebanking, mobile banking and money transfer agents.",
        covers: ["bus.finance.banking-trends"],
        objectives: [
          "Identify developments in the banking sector.",
          "Evaluate the usefulness of banking trends to the economy.",
        ],
      }),
      sub("finance.international", "6.6.12", "International financial institutions", {
        description: "Form 4.",
        covers: ["bus.finance.international-institutions"],
        objectives: [
          "Outline the international financial institutions and their roles.",
          "Analyse the effectiveness of their activities in Zimbabwe.",
        ],
      }),
    ],
  }),
  topic("insurance", "6.7", "Insurance and assurance", {
    children: [
      sub("insurance.nature", "6.7.1", "Nature and purpose of insurance and assurance; communal systems", {
        description: "Form 1: insurance and assurance, risks, pooling of risks, statistics, and communal systems such as zunde ramambo.",
        covers: ["bus.insurance.nature-purpose"],
        objectives: [
          "Explain the features and purposes of insurance and assurance and distinguish between them.",
          "Identify business and life risks and differentiate insurable from non-insurable risks.",
          "Explain the pooling of risks and the importance of statistics in insurance.",
          "Identify communal systems of insurance and assurance and state their importance.",
        ],
      }),
      sub("insurance.principles", "6.7.2", "Principles of insurance", {
        description: "Form 2: utmost good faith, indemnity, insurable interest and proximate cause.",
        covers: ["bus.insurance.principles"],
        objectives: ["Explain the principles of insurance."],
      }),
      sub("insurance.procedures", "6.7.3", "Documents used in insurance and insurance procedures", {
        description: "Form 2: proposal form, prospectus, cover note and policy; effecting a policy and making a claim; brokers, underwriters, actuaries and assessors.",
        covers: ["bus.insurance.procedures-documents"],
        objectives: [
          "Identify the documents used in insurance.",
          "Outline the procedure for obtaining a policy and for making a claim.",
          "State the functions of brokers, underwriters, actuaries and assessors.",
        ],
      }),
      sub("insurance.policies", "6.7.4", "Types of insurance and assurance policies; Export Credit Guarantee Corporation", {
        description: "Form 3: insurance policies, assurance policies, the National Social Security Authority and export credit guarantee.",
        covers: ["bus.insurance.insurance-policies", "bus.insurance.assurance-social-security"],
        objectives: [
          "Explain the types of insurance policies.",
          "Examine the benefits of insurance and assurance policies.",
          "Explain the reasons for the formation of the National Social Security Authority.",
          "Explain the purpose of the Export Credit Guarantee Corporation.",
        ],
      }),
      sub("insurance.ict", "6.7.5", "Impact of ICT on insurance and assurance", {
        description: "Form 4.",
        covers: ["bus.insurance.ict"],
        objectives: [
          "Explain e-insurance and e-assurance.",
          "State the advantages and disadvantages of ICT in insurance and assurance.",
        ],
      }),
    ],
  }),
  topic("communication", "6.8", "Business communication", {
    children: [
      sub("communication.importance", "6.8.1", "Importance of communication", {
        description: "Form 1 (with the choice of mode of communication from Form 3).",
        covers: ["bus.communication.methods"],
        objectives: [
          "Explain the term communication and outline its importance.",
          "Outline factors to consider in choosing a mode of communication.",
        ],
      }),
      sub("communication.telecommunication", "6.8.2", "Telecommunication and service providers", {
        description: "Form 1.",
        covers: ["bus.communication.telecommunications"],
        objectives: [
          "Describe types of telecommunication devices and services and their advantages and disadvantages.",
          "Identify telecommunication service providers and the services they provide.",
        ],
      }),
      sub("communication.postal", "6.8.3", "Postal services", {
        description: "Form 2.",
        covers: ["bus.communication.postal-services"],
        objectives: [
          "Identify agents of postal services and describe the postal services offered.",
          "Explain the importance and drawbacks of postal services.",
        ],
      }),
      sub("communication.effective", "6.8.4", "Effective communication", {
        description: "Form 2: enhancers of and barriers to effective communication.",
        covers: ["bus.communication.barriers"],
        objectives: [
          "Explain the importance of effective communication and identify what enhances it.",
          "Outline barriers to communication and suggest ways of overcoming them.",
        ],
      }),
      sub("communication.formal", "6.8.5", "Formal and informal communication; trends in business communication", {
        description: "Form 3.",
        covers: ["bus.communication.formal-informal-trends"],
        objectives: [
          "Distinguish between formal and informal business communication and identify their advantages and disadvantages.",
          "Draft a business letter.",
          "Assess the impact of technological developments on business communication.",
        ],
      }),
    ],
  }),
  topic("transport", "6.9", "Transport", {
    children: [
      sub("transport.modes", "6.9.1", "Importance and modes of transport", {
        description: "Form 1.",
        covers: ["bus.transport.modes"],
        objectives: [
          "Explain the importance of transport in commercial activities and trace its development.",
          "Examine the advantages and disadvantages of each mode of transport.",
        ],
      }),
      sub("transport.choice", "6.9.2", "Choice of transport, transport documents and port authorities", {
        description: "Form 2.",
        covers: ["bus.transport.choice-documents"],
        objectives: [
          "Discuss the factors that influence the choice of transport.",
          "List the documents used in transport and outline the contents of each.",
          "Describe the services provided by port authorities.",
        ],
      }),
      sub("transport.trends", "6.9.3", "Trends in transport", {
        description: "Form 3: containerisation, toll gates, vehicle tracking, e-ticketing, satellite positioning and air cargo.",
        covers: ["bus.transport.trends"],
        objectives: [
          "Describe containerisation and other developments in transport and assess their impact.",
          "Outline the reasons for the growth of air cargo and discuss the impact of ICT on transport.",
        ],
      }),
    ],
  }),
  topic("warehousing", "6.10", "Warehousing", {
    children: [
      sub("warehousing.functions", "6.10.1", "Introduction to warehousing; functions and importance", {
        description: "Forms 1 and 2: warehousing, indigenous storage systems, and the functions and importance of warehouses.",
        covers: ["bus.trade.warehousing"],
        objectives: [
          "Describe warehousing and identify indigenous storage systems.",
          "Discuss the importance and functions of warehouses.",
        ],
      }),
      sub("warehousing.types", "6.10.2", "Types of warehouses and location of a warehouse", {
        description: "Form 3.",
        covers: ["bus.trade.warehouse-types-location"],
        objectives: [
          "Identify types of warehouse.",
          "Select an appropriate site for a warehouse.",
        ],
      }),
    ],
  }),
  topic("marketing", "6.11", "Marketing", {
    children: [
      sub("marketing.concepts", "6.11.1", "Marketing concepts", {
        description: "Form 1: the need for marketing and the production, product, selling and marketing concepts.",
        covers: ["bus.marketing.role-concepts"],
        objectives: [
          "Justify the need for marketing.",
          "Explain the different marketing concepts and assess their implications for a business.",
        ],
      }),
      sub("marketing.types", "6.11.2", "Types of markets", {
        description: "Form 1: physical and virtual markets.",
        covers: ["bus.marketing.types-of-markets"],
        objectives: [
          "Identify and explain types of markets.",
          "Describe the features and discuss the advantages of physical and virtual markets.",
        ],
      }),
      sub("marketing.segmentation", "6.11.3", "Market segmentation", {
        description: "Form 2.",
        covers: ["bus.marketing.segmentation"],
        objectives: [
          "Explain market segmentation and identify bases of segmentation.",
          "Outline reasons for market segmentation.",
        ],
      }),
      sub("marketing.approaches", "6.11.4", "Marketing approaches", {
        description: "Form 2: mass and niche marketing.",
        covers: ["bus.marketing.mass-niche"],
        objectives: ["Explain mass marketing and niche marketing and distinguish between them."],
      }),
      sub("marketing.mix", "6.11.5", "Marketing mix", {
        description: "Form 3: product, price, place and promotion.",
        covers: ["bus.marketing.product", "bus.marketing.product-life-cycle", "bus.marketing.price", "bus.marketing.promotion", "bus.marketing.marketing-strategy"],
        objectives: [
          "Identify and explain the marketing mix variables.",
          "Analyse the impact of each marketing mix variable on the market and the business.",
          "Suggest appropriate products, prices, distribution and promotion for a given market and design an advertisement.",
        ],
      }),
    ],
  }),
];

const commerce = {
  board: "zimsec",
  qualification: "o-level",
  subject: "commerce",
  versionLabel: "2015-2022",
  family: "business-commerce-o",
  title: "ZIMSEC O-Level Commerce",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Commerce Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/Commerce%20Form%201-4.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and the numbers 6.1 to 6.11 are transcribed from the scope and sequence (6.0) of the Ministry's Commerce Syllabus Forms 1 - 4 (2015 - 2022); the sub-topics are the scope-and-sequence items for Forms 1 to 4, and the competency matrix (7.0) supplied their content. Sub-topic codes (6.1.1, ...) and objective codes are ours, not the board's; where the scope lists two short items for the same form they are grouped into one sub-topic. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the Mashonaland West provincial education office's copy of the Ministry document, file 'Commerce Form 1-4.pdf' (http://www.mopsemashwest.gov.zw/files/Commerce%20Form%201-4.pdf; the site's https certificate has expired, so the https URL recorded here may not load), read through a text rendering. The cover prints 'Form 1 - 4', '2015-2022' and 'Revised 2015'. The scope-and-sequence and competency-matrix tables come out partly scrambled in the text rendering (column headings unreadable, cells interleaved), so the form in which a sub-topic is taught was read from column positions and cross-checked against the competency matrix (7.1 to 7.38). Check every heading and objective against a clean copy from ZIMSEC and record the exact document URL.",
    "Subject code: not printed in the syllabus document. ZIMSEC O-Level Commerce is commonly cited as 7103; confirm it (code left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level Commerce examinations use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Assessment (8.0) as read: continuous assessment 30% (theory tests, assignments and practical projects over Forms 1 to 4) and a summative examination 70%: Paper 1, 40 multiple-choice questions (1 hour 15 minutes, 40 marks, 20% of the subject); Paper 2, structured questions and essays (2 hours, 100 marks, 50%): Section A, six compulsory structured questions totalling 40 marks; Section B, three essay questions from a choice of seven, totalling 60 marks. The number of options per multiple-choice question and the marks of each structured question are not stated. The assessment-model page says 'The Agriculture learning area will be assessed...', an evident copying slip in the document. Whether calculators are allowed is not stated (calculatorAllowed left out).",
    "Specification grid (8.6) as read through the scrambled rendering: Paper 1 and Paper 2 split across knowledge with understanding, application, analysis and evaluation with totals of 20% and 50%; the individual cell values could not be read reliably.",
    "The document's topic list (5.0) has eleven topics (Production, Trade, Consumer protection, Business organisations, Enterprise, Finance and banking, Insurance and assurance, Business communication, Transport, Warehousing, Marketing) and the scope and sequence uses the same order. Chain of distribution is listed under Production (Form 2); in this family it is the concept bus.marketing.place, shared with the other syllabi.",
    "Organisations named in the competency matrix as examples (telecommunication operators, courier companies, home-industry sites, marketing boards, business membership organisations) date from 2015; content should check that any named organisation still exists and avoid claims about its current market position.",
    "The family also serves ZIMSEC Business Enterprise and Skills and Cambridge IGCSE Business: concepts covered only by those syllabi (for example production methods, break-even analysis, cash flow forecasts, motivation theories, recruitment and the business cycle) are not part of this syllabus.",
  ],
  overview: "ZIMSEC O-Level Commerce (Forms 1-4) studies the commercial world in a Zimbabwean context: production and the ownership of the means of production, home and foreign trade, consumer protection, types of business organisation, enterprise, finance and banking (money, personal finance, banks, business finance, the stock exchange and business calculations), insurance and assurance, business communication, transport, warehousing and marketing.",
  assessmentOverview: "Continuous assessment (theory tests, assignments and practical projects, Forms 1-4) carries 30%. The examination carries 70%: Paper 1 has 40 multiple-choice questions (1 hour 15 minutes, 40 marks, 20%) and Paper 2 (2 hours, 100 marks, 50%) has six compulsory structured questions worth 40 marks in Section A and three essays chosen from seven, worth 60 marks, in Section B.",
  components: [
    { code: "1", name: "Paper 1: Multiple choice", kind: "MULTIPLE_CHOICE", description: "40 compulsory multiple-choice questions on the whole syllabus.", durationMinutes: 75, maxMarks: 40, weightingPercent: 20 },
    { code: "2", name: "Paper 2: Structured questions and essays", kind: "WRITTEN", description: "Section A (40 marks): six compulsory structured questions. Section B (60 marks): three essay questions chosen from seven.", durationMinutes: 120, maxMarks: 100, weightingPercent: 50 },
  ],
  topics: COMMERCE_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level Business Enterprise (and) Skills, Forms 1-4, 2015-2022. Topic numbers 7.1-7.8 are the scope-and-
// sequence numbers printed in the document; sub-topic codes (7.1.1, ...) are ours.
const BES_TOPICS = [
  topic("enterprise", "7.1", "The business enterprise", {
    children: [
      sub("enterprise.enterprising", "7.1.1", "Enterprising; skills and personal attributes of an enterpriser", {
        description: "Form 1: enterprising, enterpriser and enterprise; skills and attributes; benefits and drawbacks of enterprising.",
        covers: ["bus.enterprise.entrepreneurship"],
        objectives: [
          "Explain the concept of enterprising.",
          "Identify and explain the skills and personal attributes needed to run an enterprise.",
          "Identify the benefits and drawbacks of enterprising.",
        ],
      }),
      sub("enterprise.role-drivers", "7.1.2", "The role of an enterpriser; drivers towards enterprising", {
        description: "Form 2 (role of the enterpriser) and Form 3 (drivers towards enterprising).",
        covers: ["bus.enterprise.role-drivers"],
        objectives: [
          "Explain the role of an enterpriser in an enterprise.",
          "Explain and evaluate the drivers towards enterprising.",
        ],
      }),
    ],
  }),
  topic("environment", "7.2", "The enterprising environment", {
    children: [
      sub("environment.stakeholders", "7.2.1", "Internal and external stakeholders", {
        description: "Form 1.",
        covers: ["bus.enterprise.stakeholders"],
        objectives: [
          "Distinguish between internal and external stakeholders.",
          "Explain the role of each stakeholder.",
        ],
      }),
      sub("environment.resources", "7.2.2", "Resources and capabilities", {
        description: "Form 1 (need for resources and capabilities) and Form 2 (acquisition, ownership and sustainable use of resources).",
        covers: ["bus.environment.resources-capabilities", "bus.operations.sustainability"],
        objectives: [
          "Differentiate resources from capabilities and explain why they are analysed.",
          "Identify tangible and intangible resources needed in an enterprise.",
          "Identify ways of acquiring resources and analyse forms of resource ownership.",
          "Explain ways of using resources sustainably and why this matters.",
        ],
      }),
      sub("environment.internal-external", "7.2.3", "Internal and external environment; business constraints", {
        description: "Form 2 (internal and external environment, SWOT analysis) and Form 3 (economic, ecological, social and legal constraints).",
        covers: ["bus.environment.business-environment"],
        objectives: [
          "Describe the internal and external environmental factors that affect an enterprise.",
          "Carry out a SWOT analysis of an enterprise.",
          "Explain business constraints and analyse their effects.",
        ],
      }),
      sub("environment.opportunities", "7.2.4", "Business opportunities and risks", {
        description: "Form 4.",
        covers: ["bus.enterprise.opportunities-risks"],
        objectives: [
          "Investigate how business opportunities arise.",
          "Identify the risks associated with business enterprises and assess their likelihood and impact.",
        ],
      }),
    ],
  }),
  topic("setting-up", "7.3", "Setting up a new enterprise", {
    children: [
      sub("setting-up.purpose", "7.3.1", "Purpose of business enterprises", {
        description: "Form 1: employment creation, infrastructure development and other purposes.",
        covers: ["bus.organisation.purpose-sectors"],
        objectives: ["Explain the purposes of business enterprises."],
      }),
      sub("setting-up.unincorporated", "7.3.2", "Unincorporated business enterprises; setting up a sole proprietorship or partnership", {
        description: "Form 1 (forms of unincorporated enterprise) and Form 2 (setting one up).",
        covers: ["bus.organisation.sole-traders-partnerships"],
        objectives: [
          "Identify and describe the forms of unincorporated business enterprise.",
          "Explain the advantages and disadvantages of unincorporated business enterprises.",
          "Describe the process of setting up a sole proprietorship or partnership.",
        ],
      }),
      sub("setting-up.incorporated", "7.3.3", "Incorporated business enterprises", {
        description: "Form 2: limited companies.",
        covers: ["bus.organisation.limited-companies"],
        objectives: [
          "Explain the features of incorporated business enterprises.",
          "Analyse the benefits and limitations of different incorporated enterprises.",
        ],
      }),
      sub("setting-up.ethics", "7.3.4", "Business ethics", {
        description: "Form 2.",
        covers: ["bus.enterprise.ethics"],
        objectives: [
          "Explain issues concerning business ethics.",
          "Evaluate the importance of being ethical in business and apply ethics in projects.",
        ],
      }),
      sub("setting-up.failure", "7.3.5", "Causes of business failure", {
        description: "Form 2.",
        covers: ["bus.enterprise.success-failure"],
        objectives: [
          "Discuss why some businesses fail.",
          "Suggest solutions to the causes of business failure.",
        ],
      }),
      sub("setting-up.forms", "7.3.6", "Forms of business enterprises", {
        description: "Form 3: public corporations, joint ventures and franchises.",
        covers: ["bus.organisation.public-enterprises", "bus.organisation.franchises-joint-ventures"],
        objectives: [
          "Describe the features of public corporations, joint ventures and franchises.",
          "Analyse the advantages and disadvantages of each form and compare them.",
        ],
      }),
      sub("setting-up.assistance", "7.3.7", "Assistance to enterprise start-ups", {
        description: "Form 3.",
        covers: ["bus.enterprise.start-up-support"],
        objectives: [
          "Justify why new business enterprises need support.",
          "Identify ways in which start-ups are supported.",
        ],
      }),
      sub("setting-up.size", "7.3.8", "Business size", {
        description: "Form 3 (small and large businesses) and Form 4 (measuring size; small to medium enterprises and government assistance to them).",
        covers: ["bus.enterprise.business-size", "bus.organisation.smes"],
        objectives: [
          "Explain why some enterprises grow and others remain small.",
          "Discuss the advantages and disadvantages of small and large enterprises.",
          "Evaluate methods of measuring business size.",
          "Discuss the role of small to medium enterprises in the economy and identify government assistance to them.",
        ],
      }),
      sub("setting-up.growth", "7.3.9", "Business growth", {
        description: "Form 2 (factors influencing growth) and Form 4 (methods and effects of growth).",
        covers: ["bus.enterprise.business-growth"],
        objectives: [
          "Describe factors influencing business growth.",
          "Identify and evaluate methods of business growth.",
          "Assess the effects of business growth.",
        ],
      }),
      sub("setting-up.formation", "7.3.10", "Risk, ownership and limited liability; formation of a business enterprise", {
        description: "Form 4: risks of forming an enterprise, corporate legal personality and limited liability, documents required.",
        covers: ["bus.organisation.formation-liability"],
        objectives: [
          "Explain the risks of forming a new business enterprise.",
          "Explain corporate legal personality and limited liability and evaluate the importance of limited liability.",
          "Explain the contents of the documents required to form a business enterprise.",
        ],
      }),
    ],
  }),
  topic("planning", "7.4", "Business planning", {
    children: [
      sub("planning.business-plan", "7.4.1", "Purpose of business planning; the business plan", {
        description: "Form 1 (purpose, a mini business plan) and Form 3 (components of a business plan, developing a plan).",
        covers: ["bus.enterprise.business-plan"],
        objectives: [
          "Explain business planning and the purpose and importance of a business plan.",
          "Explain the components of a business plan.",
          "Develop a business plan.",
        ],
      }),
      sub("planning.objectives", "7.4.2", "Business objectives", {
        description: "Form 1.",
        covers: ["bus.enterprise.objectives"],
        objectives: ["Identify different business objectives."],
      }),
      sub("planning.process", "7.4.3", "Business planning process; implementation of a business plan", {
        description: "Form 2 (planning process) and Form 4 (implementation).",
        covers: ["bus.enterprise.planning-process"],
        objectives: [
          "Describe the business planning process and the importance of each step.",
          "Implement a business plan on a selected project and manage it.",
        ],
      }),
    ],
  }),
  topic("finance", "7.5", "Enterprise finance and securing investors", {
    children: [
      sub("finance.need", "7.5.1", "The need for finance", {
        description: "Form 1: the need for finance; investment and saving.",
        covers: ["bus.finance.need-for-finance", "bus.finance.income-saving-investment"],
        objectives: [
          "Explain the need for finance in an enterprise.",
          "Explain investment and saving.",
        ],
      }),
      sub("finance.sources", "7.5.2", "Sources of finance", {
        description: "Form 1.",
        covers: ["bus.finance.sources"],
        objectives: [
          "Identify sources of finance and differentiate internal from external sources.",
          "Explain the advantages and disadvantages of various sources of finance.",
          "Identify factors to consider when choosing a source of finance.",
        ],
      }),
      sub("finance.statements", "7.5.3", "Financial statements", {
        description: "Forms 2 and 3: the income statement and the statement of financial position.",
        covers: ["bus.finance.profit", "bus.finance.income-statement", "bus.finance.financial-position"],
        objectives: [
          "Explain the importance of keeping accurate financial records.",
          "Prepare an income statement.",
          "Draw up a statement of financial position.",
        ],
      }),
      sub("finance.cash-budgets", "7.5.4", "Cash budgets", {
        description: "Forms 2 and 3.",
        covers: ["bus.finance.cash-flow-forecast", "bus.finance.cash-flow-problems"],
        objectives: [
          "Describe a cash budget and identify cash inflows and outflows.",
          "Prepare a simple cash budget and use it on a project.",
        ],
      }),
      sub("finance.working-capital", "7.5.5", "Working capital", {
        description: "Form 3.",
        covers: ["bus.finance.working-capital"],
        objectives: [
          "Explain the meaning of working capital and identify the components of the working capital cycle.",
          "Discuss the importance of managing working capital and explain ways of managing it.",
        ],
      }),
      sub("finance.institutions", "7.5.6", "Financial institutions", {
        description: "Form 3: merchant banks, commercial banks, discount houses and others.",
        covers: ["bus.finance.commercial-banks", "bus.finance.other-institutions"],
        objectives: [
          "Identify different types of financial institution.",
          "Explain the functions of different financial institutions.",
        ],
      }),
      sub("finance.costs", "7.5.7", "Business costs", {
        description: "Form 4: fixed, variable, direct and indirect costs.",
        covers: ["bus.operations.costs"],
        objectives: ["Classify business costs."],
      }),
      sub("finance.break-even", "7.5.8", "Break-even analysis", {
        description: "Form 4: break-even point, profit and loss regions and margin of safety.",
        covers: ["bus.operations.break-even-calculation", "bus.operations.break-even-chart"],
        objectives: [
          "Explain break-even analysis and discuss its importance.",
          "Construct a break-even chart.",
          "Calculate the break-even point and the margin of safety for a business venture.",
        ],
      }),
      sub("finance.budgets", "7.5.9", "Budgeting and budgets", {
        description: "Form 4: cash, sales, production and purchases budgets.",
        covers: ["bus.finance.budgets"],
        objectives: [
          "Explain budgeting and budgets and identify types of budget.",
          "Prepare a budget for an enterprise and explain the importance of budgeting.",
        ],
      }),
      sub("finance.investors", "7.5.10", "Securing investors", {
        description: "Form 4.",
        covers: ["bus.finance.securing-investors"],
        objectives: ["Explain different ways of attracting investors."],
      }),
    ],
  }),
  topic("people", "7.6", "People in business enterprises", {
    children: [
      sub("people.managers", "7.6.1", "Functions of managers", {
        description: "Form 2: planning, leading, organising and controlling.",
        covers: ["bus.people.management-functions"],
        objectives: ["Explain the functions of managers in a business."],
      }),
      sub("people.motivating", "7.6.2", "Motivating employees; financial and non-financial methods of motivation", {
        description: "Form 2 (and Form 4 in the scope and sequence).",
        covers: ["bus.people.motivation-methods"],
        objectives: [
          "Explain the benefits of motivated employees.",
          "Identify financial and non-financial methods of motivating employees.",
          "Investigate how local employees are motivated.",
        ],
      }),
      sub("people.theories", "7.6.3", "Motivation theories", {
        description: "Form 3: Maslow, Taylor, Herzberg and McGregor.",
        covers: ["bus.people.motivation-theories"],
        objectives: [
          "Identify and discuss the theories of motivation.",
          "Assess how well motivation theories apply to different enterprises.",
        ],
      }),
      sub("people.leadership", "7.6.4", "Leadership", {
        description: "Form 3: qualities of a leader and leadership styles.",
        covers: ["bus.people.leadership"],
        objectives: [
          "Explain leadership and identify the qualities of a good leader.",
          "Discuss different leadership styles.",
        ],
      }),
      sub("people.communication", "7.6.5", "Business communication", {
        description: "Form 3: importance, methods and media of communication and the impact of ICTs.",
        covers: ["bus.communication.methods", "bus.communication.formal-informal-trends"],
        objectives: [
          "Explain business communication and analyse its importance.",
          "Evaluate methods of communication and justify the choice of method and medium in given circumstances.",
          "Assess the impact of ICTs on business communication.",
        ],
      }),
      sub("people.structure", "7.6.6", "Organisational structure", {
        description: "Form 4 (listed in the scope and sequence; the text rendering shows no competency-matrix section for it).",
        covers: ["bus.people.organisational-structure"],
        objectives: ["Describe and interpret the organisational structure of an enterprise."],
      }),
    ],
  }),
  topic("marketing", "7.7", "Markets and marketing", {
    children: [
      sub("marketing.need", "7.7.1", "The need for marketing", {
        description: "Form 1: market, product, demand and supply; the importance of marketing.",
        covers: ["bus.marketing.role-concepts", "bus.marketing.demand-supply"],
        objectives: [
          "Explain the meaning of market, product, demand and supply.",
          "Discuss the importance of marketing to business enterprises.",
          "Explain the relationship between demand and supply.",
        ],
      }),
      sub("marketing.types", "7.7.2", "Types of markets", {
        description: "Form 2: physical and virtual, local, regional and global markets; foreign markets.",
        covers: ["bus.marketing.types-of-markets", "bus.marketing.foreign-markets"],
        objectives: [
          "Identify and explain types of markets and the features of physical and virtual markets.",
          "Discuss the advantages and disadvantages of physical and virtual markets.",
          "Evaluate the benefits and challenges of foreign markets and suggest ways of reducing the challenges.",
        ],
      }),
      sub("marketing.research", "7.7.3", "Marketing research", {
        description: "Form 3: types and sources of data, sampling, data collection tools, presentation and analysis.",
        covers: ["bus.marketing.market-research"],
        objectives: [
          "Explain marketing research and identify types and sources of research data.",
          "Apply sampling methods and design data collection tools.",
          "Present research data in tables, graphs and charts and interpret it.",
        ],
      }),
      sub("marketing.segmentation", "7.7.4", "Market segmentation", {
        description: "Form 3.",
        covers: ["bus.marketing.segmentation"],
        objectives: [
          "Discuss factors to consider when segmenting a market and the reasons for segmentation.",
          "Segment a market.",
        ],
      }),
      sub("marketing.forecasting", "7.7.5", "Demand forecasting", {
        description: "Form 3.",
        covers: ["bus.marketing.demand-forecasting"],
        objectives: [
          "Explain the importance of demand forecasting.",
          "Identify methods of demand forecasting.",
        ],
      }),
      sub("marketing.integration", "7.7.6", "Economic integration", {
        description: "Form 4: regional economic integration such as SADC, COMESA and ECOWAS.",
        covers: ["bus.trade.trading-blocs"],
        objectives: [
          "Explain the concept of economic integration and describe the aims of different economic blocs.",
          "Explain the advantages and disadvantages of economic integration.",
        ],
      }),
      sub("marketing.mix", "7.7.7", "Marketing mix", {
        description: "Form 4: product (development, life cycle, packaging, branding), price, place and promotion.",
        covers: ["bus.marketing.product", "bus.marketing.product-life-cycle", "bus.marketing.price", "bus.marketing.place", "bus.marketing.promotion", "bus.marketing.marketing-strategy"],
        objectives: [
          "Identify and explain the marketing mix variables.",
          "Evaluate the impact of the marketing mix variables on marketing.",
          "Suggest appropriate pricing, product, distribution and promotion strategies for a given market.",
        ],
      }),
    ],
  }),
  topic("operations", "7.8", "Operations management", {
    children: [
      sub("operations.production", "7.8.1", "Nature of production", {
        description: "Form 1: means of production, stages of production and the production function.",
        covers: ["bus.production.business-activity", "bus.production.sectors"],
        objectives: [
          "Identify the means and the stages of production.",
          "Explain and illustrate the production function.",
        ],
      }),
      sub("operations.location", "7.8.2", "Location of production", {
        description: "Form 1: location and relocation factors.",
        covers: ["bus.operations.location"],
        objectives: [
          "Identify factors influencing the location of a business unit.",
          "Discuss factors that lead to the relocation of a business.",
        ],
      }),
      sub("operations.value-addition", "7.8.3", "Value addition", {
        description: "Form 2.",
        covers: ["bus.production.value-addition"],
        objectives: [
          "Explain value addition, ways of adding value and why it is important.",
          "Create a product using locally available inputs.",
        ],
      }),
      sub("operations.transport", "7.8.4", "Transport", {
        description: "Form 2: importance, modes and choice of transport.",
        covers: ["bus.transport.modes", "bus.transport.choice-documents"],
        objectives: [
          "Explain the importance of transport and identify the modes of transport.",
          "Describe the strengths and weaknesses of the different modes.",
          "Explain the factors influencing the choice of mode of transport.",
        ],
      }),
      sub("operations.purchasing", "7.8.5", "Purchasing; inventory management", {
        description: "Form 3: the purchasing function and cycle, e-purchasing, types of inventory and the costs and benefits of holding inventory.",
        covers: ["bus.operations.purchasing-inventory"],
        objectives: [
          "Explain the importance of the purchasing function and identify the five rights of purchasing.",
          "Explain the stages of the purchasing cycle and the role of e-purchasing.",
          "Describe inventory management and the advantages and disadvantages of holding inventory.",
        ],
      }),
      sub("operations.warehousing", "7.8.6", "Warehousing", {
        description: "Form 4: the role, types and location of warehouses.",
        covers: ["bus.trade.warehousing", "bus.trade.warehouse-types-location"],
        objectives: [
          "Describe the role of warehousing.",
          "State different types of warehouse and explain their functions.",
          "Explain factors to consider when locating a warehouse.",
        ],
      }),
      sub("operations.quality", "7.8.7", "Quality management", {
        description: "Form 4: total quality management, quality circles and just-in-time.",
        covers: ["bus.operations.quality"],
        objectives: [
          "Analyse the importance of producing quality products.",
          "Explain ways of assuring quality.",
        ],
      }),
      sub("operations.ict", "7.8.8", "ICTs in operations management", {
        description: "Form 4: bar codes, radio frequency identification, computer-aided design and online billing.",
        covers: ["bus.operations.technology"],
        objectives: [
          "Evaluate the impact of ICTs in operations management.",
          "Recommend appropriate ICT tools for given circumstances.",
        ],
      }),
    ],
  }),
];

const bes = {
  board: "zimsec",
  qualification: "o-level",
  subject: "business-studies",
  versionLabel: "2015-2022",
  family: "business-commerce-o",
  title: "ZIMSEC O-Level Business Enterprise and Skills",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "Business Enterprise Skills Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/Business%20Enterprise%20and%20Skills.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Topic names and the numbers 7.1 to 7.8 are transcribed from the scope and sequence (7.0) of the Ministry's Business Enterprise Skills Syllabus Forms 1 - 4 (2015 - 2022); the sub-topics are the scope-and-sequence items for Forms 1 to 4, and the competency matrix (8.1 to 8.4) supplied their content. Sub-topic codes (7.1.1, ...) and objective codes are ours, not the board's; where the same item recurs in several forms, or two short items belong together, they are grouped into one sub-topic and the forms are given in its description. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the Mashonaland West provincial education office's copy of the Ministry document, file 'Business Enterprise and Skills.pdf' (http://www.mopsemashwest.gov.zw/files/Business%20Enterprise%20and%20Skills.pdf; the site's https certificate has expired, so the https URL recorded here may not load), read through a text rendering. The document's own title is 'Business Enterprise Skills' (Forms 1 - 4, 2015 - 2022); the catalogue name 'Business Enterprise and Skills' is kept. The scope-and-sequence and competency-matrix tables are partly scrambled in the rendering; check every heading and objective against a clean copy from ZIMSEC and record the exact document URL.",
    "Subject code: not printed in the syllabus document; confirm the ZIMSEC code for this subject (code left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level examinations in this subject use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Assessment (9.0) as read: continuous assessment 40% (theory tests 6%, assignments 8%, practical projects 26%, including at least two enterprise projects: one in Forms 1-2 and one in Forms 3-4) and a summative examination 60%: Paper 1, structured short questions (six questions, 1 hour 45 minutes, 100 marks, 30%); Paper 2, case study and essays (2 hours 15 minutes, 100 marks, 30%): Section A, one case study worth 40 marks; Section B, three essays from a choice of six, worth 60 marks. The marks of each Paper 1 question are not stated. Whether calculators are allowed is not stated (calculatorAllowed left out).",
    "Specification grid (9.4) as read: Paper 1 and Paper 2 weighted 30% each across knowledge with understanding, application, analysis and evaluation; some cells could not be read reliably in the rendering.",
    "Uncertain placements: the scope and sequence lists 'Organisational structure' and 'Financial and non-financial methods of motivation' in the Form 4 column of People in business enterprises, but the text rendering shows no Form 4 competency-matrix section for that topic (financial and non-financial methods appear in the Form 2 matrix). 'Cash budgets' appears in both the Form 2 and Form 3 columns. 'Business size' appears in Forms 2, 3 and 4. Confirm against a clean copy.",
    "Practical projects (an enterprise project in Forms 1-2 and another in Forms 3-4) and the mini-enterprise activities are continuous assessment: the platform supports them only with planning guidance, not assessment.",
    "The family also serves ZIMSEC Commerce and Cambridge IGCSE Business: concepts covered only by those syllabi (for example banking services in depth, insurance, trade documents, recruitment and the business cycle) are not part of this syllabus.",
  ],
  overview: "ZIMSEC O-Level Business Enterprise and Skills (Forms 1-4) develops enterprising skills through eight topics: the business enterprise and the enterpriser, the enterprising environment, setting up a new enterprise, business planning, enterprise finance and securing investors (including financial statements, cash budgets, costs and break-even), people in business enterprises, markets and marketing, and operations management.",
  assessmentOverview: "Continuous assessment (theory tests, assignments and two enterprise projects) carries 40%. The examination carries 60%: Paper 1 has six structured short questions (1 hour 45 minutes, 100 marks, 30%) and Paper 2 (2 hours 15 minutes, 100 marks, 30%) has one compulsory case study worth 40 marks in Section A and three essays chosen from six, worth 60 marks, in Section B.",
  components: [
    { code: "1", name: "Paper 1: Structured short questions", kind: "WRITTEN", description: "Six compulsory structured questions on the whole syllabus.", durationMinutes: 105, maxMarks: 100, weightingPercent: 30 },
    { code: "2", name: "Paper 2: Case study and essays", kind: "WRITTEN", description: "Section A (40 marks): one compulsory case study. Section B (60 marks): three essays chosen from six.", durationMinutes: 135, maxMarks: 100, weightingPercent: 30 },
  ],
  topics: BES_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge IGCSE Business 0264, 2027-2029. Topic, subtopic and sub-subtopic headings and numbers are the board's.
const C0264_TOPICS = [
  topic("activity", "1", "Understanding business activity", {
    children: [
      sub("activity.business-activity", "1.1", "Business activity", {
        children: [
          sub("activity.business-activity.nature", "1.1.1", "The nature of business activity", {
            covers: ["bus.production.business-activity", "bus.production.value-addition"],
            objectives: [
              "Describe the factors of production: land, labour, capital and enterprise.",
              "Explain the concept of added value and how a business can increase it.",
              "Explain the concept of opportunity cost.",
            ],
          }),
        ],
      }),
      sub("activity.sectors", "1.2", "Economic sectors", {
        children: [
          sub("activity.sectors.types", "1.2.1", "Types of economic sector", {
            covers: ["bus.production.sectors", "bus.organisation.purpose-sectors"],
            objectives: [
              "Classify business activity into the primary, secondary and tertiary sectors.",
              "Distinguish between the private sector and the public sector.",
            ],
          }),
        ],
      }),
      sub("activity.enterprise", "1.3", "Enterprise, business growth and size", {
        children: [
          sub("activity.enterprise.entrepreneurship", "1.3.1", "Enterprise and entrepreneurship", {
            covers: ["bus.enterprise.entrepreneurship", "bus.enterprise.business-plan", "bus.enterprise.start-up-support"],
            objectives: [
              "Identify the characteristics of successful entrepreneurs.",
              "Explain the purpose, key elements and importance of a business plan.",
              "Explain why and how governments support business start-ups.",
            ],
          }),
          sub("activity.enterprise.size", "1.3.2", "The methods and problems of measuring business size", {
            covers: ["bus.enterprise.business-size"],
            objectives: [
              "Describe methods of measuring business size and explain why profit is not one of them.",
              "Explain the problems of measuring business size.",
            ],
          }),
          sub("activity.enterprise.growth", "1.3.3", "Why some businesses grow and others remain small", {
            covers: ["bus.enterprise.business-growth"],
            objectives: [
              "Explain why owners may want to grow a business.",
              "Explain internal growth and external growth through mergers and takeovers, including horizontal and vertical integration.",
              "Evaluate methods of growth and the problems linked to growth.",
              "Explain why some businesses remain small.",
            ],
          }),
          sub("activity.enterprise.success", "1.3.4", "Why some businesses succeed and others fail", {
            covers: ["bus.enterprise.success-failure"],
            objectives: ["Explain the reasons why businesses succeed or fail."],
          }),
        ],
      }),
      sub("activity.organisation", "1.4", "Types of business organisation", {
        children: [
          sub("activity.organisation.types", "1.4.1", "Different types of business organisation", {
            covers: ["bus.organisation.sole-traders-partnerships", "bus.organisation.limited-companies", "bus.organisation.franchises-joint-ventures"],
            objectives: [
              "Describe sole traders, partnerships, private limited companies and public limited companies and their advantages and disadvantages.",
              "Recommend and justify a suitable type of business organisation for a given situation.",
              "Describe franchises, joint ventures and social enterprises and the advantages and disadvantages of franchises and joint ventures.",
            ],
          }),
        ],
      }),
      sub("activity.objectives", "1.5", "Business objectives and stakeholder objectives", {
        children: [
          sub("activity.objectives.business", "1.5.1", "Business objectives", {
            covers: ["bus.enterprise.objectives"],
            objectives: ["Identify business objectives such as survival, growth, profit and market share, and explain why objectives are important."],
          }),
          sub("activity.objectives.stakeholders", "1.5.2", "The role of stakeholder groups", {
            covers: ["bus.enterprise.stakeholders"],
            objectives: [
              "Identify internal and external stakeholder groups and their objectives.",
              "Explain how the objectives of different stakeholder groups may conflict.",
            ],
          }),
        ],
      }),
    ],
  }),
  topic("people", "2", "People in business", {
    children: [
      sub("people.hrm", "2.1", "Human resource management (HRM)", {
        children: [
          sub("people.hrm.recruitment", "2.1.1", "Recruiting and selecting employees", {
            covers: ["bus.people.recruitment-selection"],
            objectives: [
              "Describe the stages of the recruitment process and methods of selection.",
              "Evaluate internal and external recruitment.",
              "Recommend and justify whom to employ in a given situation.",
            ],
          }),
          sub("people.hrm.contracts", "2.1.2", "Employment contracts and legal controls over employment issues", {
            covers: ["bus.people.employment-contracts"],
            objectives: [
              "Describe the main contents of an employment contract and its benefits to employers and employees.",
              "Explain legal controls over employment issues and their effects on employers and employees.",
            ],
          }),
          sub("people.hrm.training", "2.1.3", "Training", {
            covers: ["bus.people.training"],
            objectives: [
              "Explain why training is important to a business and its employees.",
              "Evaluate induction, on-the-job and off-the-job training.",
            ],
          }),
        ],
      }),
      sub("people.organisation", "2.2", "Organisation and management", {
        children: [
          sub("people.organisation.structures", "2.2.1", "Simple organisational structures", {
            covers: ["bus.people.organisational-structure"],
            objectives: [
              "Identify the main functional areas of a business.",
              "Explain tall and flat hierarchies, chains of command and spans of control, and interpret simple organisational charts.",
              "Explain flexible working and evaluate part-time and full-time employment.",
            ],
          }),
          sub("people.organisation.management", "2.2.2", "The functions of management", {
            covers: ["bus.people.management-functions"],
            objectives: [
              "Explain planning, organising, coordinating, commanding and controlling.",
              "Evaluate delegation.",
            ],
          }),
          sub("people.organisation.leadership", "2.2.3", "Leadership styles", {
            covers: ["bus.people.leadership"],
            objectives: [
              "Describe autocratic, democratic and laissez-faire leadership and their advantages and disadvantages.",
              "Recommend and justify a leadership style for a given situation.",
            ],
          }),
          sub("people.organisation.downsizing", "2.2.4", "Why reducing the size of the workforce may be necessary", {
            covers: ["bus.people.workforce-reduction"],
            objectives: [
              "Explain downsizing, redundancy and the reasons for reducing a workforce.",
              "Recommend and justify which employees to make redundant in a given situation.",
            ],
          }),
          sub("people.organisation.unions", "2.2.5", "The role of trade unions", {
            covers: ["bus.people.trade-unions"],
            objectives: ["Explain what a trade union is and the benefits to employees of membership."],
          }),
        ],
      }),
      sub("people.communication", "2.3", "Methods of communication", {
        children: [
          sub("people.communication.importance", "2.3.1", "Why communication is important", {
            covers: ["bus.communication.methods"],
            objectives: [
              "Explain why communication is important for a business.",
              "Evaluate methods of internal and external communication.",
              "Recommend and justify a method of communication for a given situation.",
            ],
          }),
          sub("people.communication.barriers", "2.3.2", "Communication barriers", {
            covers: ["bus.communication.barriers"],
            objectives: [
              "Give examples of communication barriers and explain their causes and the problems they cause.",
              "Explain how communication barriers can be reduced or removed.",
            ],
          }),
        ],
      }),
      sub("people.motivation", "2.4", "Motivating employees", {
        children: [
          sub("people.motivation.importance", "2.4.1", "The importance of a well-motivated workforce", {
            covers: ["bus.people.motivation-theories"],
            objectives: [
              "Explain why people work and the benefits of a well-motivated workforce.",
              "Explain the motivational theories of Maslow, Taylor and Herzberg.",
            ],
          }),
          sub("people.motivation.methods", "2.4.2", "Methods of motivation", {
            covers: ["bus.people.motivation-methods"],
            objectives: [
              "Describe financial and non-financial methods of motivation.",
              "Recommend and justify a method of motivation for a given situation.",
            ],
          }),
        ],
      }),
    ],
  }),
  topic("marketing", "3", "Marketing", {
    children: [
      sub("marketing.market", "3.1", "Marketing and the market", {
        children: [
          sub("marketing.market.role", "3.1.1", "The role of marketing", {
            covers: ["bus.marketing.role-concepts"],
            objectives: ["Explain the role of marketing in identifying and satisfying customer needs, keeping customers loyal and anticipating change."],
          }),
          sub("marketing.market.changes", "3.1.2", "Understanding market changes", {
            covers: ["bus.marketing.market-changes"],
            objectives: [
              "Explain why spending patterns change and why markets become more competitive, and how businesses respond.",
              "Calculate market share.",
            ],
          }),
          sub("marketing.market.mass-niche", "3.1.3", "Mass markets and niche markets", {
            covers: ["bus.marketing.mass-niche"],
            objectives: ["Explain mass and niche markets and their advantages and disadvantages."],
          }),
          sub("marketing.market.segmentation", "3.1.4", "Market segmentation", {
            covers: ["bus.marketing.segmentation"],
            objectives: ["Explain how markets can be segmented and the advantages and disadvantages of segmentation."],
          }),
        ],
      }),
      sub("marketing.research", "3.2", "Market research", {
        children: [
          sub("marketing.research.methods", "3.2.1", "Methods of market research", {
            covers: ["bus.marketing.market-research"],
            objectives: [
              "Explain why businesses use market research and the concept of sampling.",
              "Evaluate primary and secondary research methods and the factors affecting the accuracy of research data.",
              "Analyse simple market research data.",
            ],
          }),
        ],
      }),
      sub("marketing.mix", "3.3", "Marketing mix", {
        children: [
          sub("marketing.mix.product", "3.3.1", "Product", {
            covers: ["bus.marketing.product", "bus.marketing.product-life-cycle"],
            objectives: [
              "Explain the importance of brand image and the role of packaging, and evaluate developing new products.",
              "Describe and interpret the product life cycle.",
              "Evaluate extension strategies and recommend one for a given situation.",
            ],
          }),
          sub("marketing.mix.price", "3.3.2", "Price", {
            covers: ["bus.marketing.price"],
            objectives: ["Evaluate pricing methods and recommend one for a given situation."],
          }),
          sub("marketing.mix.place", "3.3.3", "Place", {
            covers: ["bus.marketing.place"],
            objectives: ["Evaluate distribution channels and recommend one for a given situation."],
          }),
          sub("marketing.mix.promotion", "3.3.4", "Promotion", {
            covers: ["bus.marketing.promotion"],
            objectives: [
              "Explain the reasons for promotion.",
              "Recommend and justify methods of sales promotion and advertising for a given situation.",
            ],
          }),
          sub("marketing.mix.ecommerce", "3.3.5", "Ecommerce", {
            covers: ["bus.marketing.ecommerce"],
            objectives: ["Give examples of ecommerce and evaluate it for businesses and for customers."],
          }),
          sub("marketing.mix.strategy", "3.3.6", "Marketing strategy", {
            covers: ["bus.marketing.marketing-strategy"],
            objectives: ["Explain the importance of the elements of the marketing mix and recommend an appropriate mix for a given situation."],
          }),
          sub("marketing.mix.new-markets", "3.3.7", "Entering new markets in other countries as a method of growth", {
            covers: ["bus.marketing.foreign-markets"],
            objectives: ["Explain the advantages and disadvantages of entering new markets in other countries."],
          }),
        ],
      }),
      sub("marketing.legal", "3.4", "Legal controls", {
        children: [
          sub("marketing.legal.controls", "3.4.1", "Legal controls related to marketing", {
            covers: ["bus.consumer.legal-protection"],
            objectives: ["Explain the purpose of legal controls that protect customers and their effects on marketing."],
          }),
        ],
      }),
    ],
  }),
  topic("operations", "4", "Operations management", {
    children: [
      sub("operations.production", "4.1", "Production of goods and services", {
        children: [
          sub("operations.production.processes", "4.1.1", "Production processes", {
            covers: ["bus.operations.efficiency-lean", "bus.operations.purchasing-inventory"],
            objectives: [
              "Calculate labour productivity and explain why efficiency matters and how to increase it.",
              "Explain lean production, just-in-time and Kaizen and their advantages and disadvantages.",
              "Explain why businesses hold inventory and what affects how much they hold.",
            ],
          }),
          sub("operations.production.methods", "4.1.2", "The main methods of production", {
            covers: ["bus.operations.production-methods"],
            objectives: [
              "Describe job, batch and flow production and their advantages and disadvantages.",
              "Recommend and justify a production method for a given situation.",
            ],
          }),
        ],
      }),
      sub("operations.technology", "4.2", "Technology and production of goods and services", {
        children: [
          sub("operations.technology.use", "4.2.1", "The use of technology in the production of goods and services", {
            covers: ["bus.operations.technology"],
            objectives: [
              "Explain how automation, mechanisation, CAM and 3D printing change production and how technology raises productivity in services.",
              "Evaluate changes in technology for businesses and employees.",
            ],
          }),
        ],
      }),
      sub("operations.sustainable", "4.3", "Sustainable production of goods and services", {
        children: [
          sub("operations.sustainable.methods", "4.3.1", "Methods of sustainable production of goods and services", {
            covers: ["bus.operations.sustainability"],
            objectives: [
              "Explain how businesses can be more sustainable.",
              "Evaluate a business becoming more sustainable.",
            ],
          }),
        ],
      }),
      sub("operations.costs", "4.4", "Costs, scale of production and break-even analysis", {
        children: [
          sub("operations.costs.classify", "4.4.1", "Identify and classify costs", {
            covers: ["bus.operations.costs"],
            objectives: [
              "Classify and calculate fixed, variable, average and total costs.",
              "Use cost data to make simple decisions.",
            ],
          }),
          sub("operations.costs.scale", "4.4.2", "Economies and diseconomies of scale", {
            covers: ["bus.operations.economies-of-scale"],
            objectives: ["Explain economies and diseconomies of scale."],
          }),
          sub("operations.costs.break-even", "4.4.3", "Break-even analysis", {
            covers: ["bus.operations.break-even-calculation", "bus.operations.break-even-chart"],
            objectives: [
              "Complete, amend and interpret a simple break-even chart.",
              "Calculate break-even output and the margin of safety and interpret them.",
              "Use break-even analysis to make decisions and explain its limitations.",
            ],
          }),
        ],
      }),
      sub("operations.quality", "4.5", "Quality of goods and services", {
        children: [
          sub("operations.quality.importance", "4.5.1", "Why quality is important and how quality may be achieved", {
            covers: ["bus.operations.quality"],
            objectives: [
              "Explain what quality means and why it is important.",
              "Evaluate quality control and quality assurance and recommend one for a given situation.",
            ],
          }),
        ],
      }),
      sub("operations.location", "4.6", "Location decisions", {
        children: [
          sub("operations.location.factors", "4.6.1", "Main factors which influence location decisions", {
            covers: ["bus.operations.location"],
            objectives: [
              "Explain the factors that influence the location of manufacturing and service businesses and the choice of country.",
              "Recommend and justify a location for a business in a given situation.",
            ],
          }),
        ],
      }),
    ],
  }),
  topic("finance", "5", "Financial information and decisions", {
    children: [
      sub("finance.business-finance", "5.1", "Business finance", {
        children: [
          sub("finance.business-finance.need", "5.1.1", "The need for business finance", {
            covers: ["bus.finance.need-for-finance", "bus.finance.working-capital"],
            objectives: [
              "Explain why businesses need finance and distinguish short-term from long-term needs.",
              "Explain the concept and importance of working capital.",
            ],
          }),
          sub("finance.business-finance.sources", "5.1.2", "The main sources of finance", {
            covers: ["bus.finance.sources"],
            objectives: [
              "Describe internal and external sources of finance and their advantages and disadvantages.",
              "Explain the factors to consider when choosing a source of finance and recommend a source for a given situation.",
            ],
          }),
        ],
      }),
      sub("finance.cash-flow", "5.2", "Cash flow forecast", {
        children: [
          sub("finance.cash-flow.importance", "5.2.1", "The importance of cash and cash flow forecasts", {
            covers: ["bus.finance.cash-flow-forecast", "bus.finance.cash-flow-problems"],
            objectives: [
              "Explain why cash is important and what a cash flow forecast is.",
              "Amend, complete and interpret a simple cash flow forecast (constructing one is not assessed).",
              "Explain how a short-term cash flow problem may be overcome.",
            ],
          }),
        ],
      }),
      sub("finance.profit", "5.3", "Profit and loss", {
        children: [
          sub("finance.profit.importance", "5.3.1", "What is profit and why it is important", {
            covers: ["bus.finance.profit"],
            objectives: ["Explain what profit is and why it is important to private sector businesses."],
          }),
          sub("finance.profit.statement", "5.3.2", "Statement of profit or loss", {
            covers: ["bus.finance.income-statement"],
            objectives: [
              "Identify the main features of a statement of profit or loss.",
              "Make simple calculations from a statement of profit or loss and use it to make decisions (constructing one is not assessed).",
            ],
          }),
        ],
      }),
      sub("finance.position", "5.4", "Statement of financial position", {
        children: [
          sub("finance.position.elements", "5.4.1", "The main elements of a statement of financial position", {
            covers: ["bus.finance.financial-position"],
            objectives: [
              "Identify non-current and current assets and liabilities and explain capital employed.",
              "Calculate total assets, total liabilities and working capital and use the statement to make decisions (constructing one is not assessed).",
            ],
          }),
        ],
      }),
      sub("finance.analysis", "5.5", "Analysis of accounts", {
        children: [
          sub("finance.analysis.profitability", "5.5.1", "Profitability", {
            covers: ["bus.finance.profitability-ratios"],
            objectives: ["Calculate and interpret the gross profit margin, profit margin and return on capital employed."],
          }),
          sub("finance.analysis.liquidity", "5.5.2", "Liquidity", {
            covers: ["bus.finance.liquidity-ratios"],
            objectives: ["Explain liquidity and calculate and interpret the current ratio and the acid test ratio."],
          }),
          sub("finance.analysis.users", "5.5.3", "Users of accounts", {
            covers: ["bus.finance.users-of-accounts"],
            objectives: [
              "Explain how internal and external users use accounts and ratio analysis to make decisions.",
              "Explain the limitations of accounts and ratio analysis.",
            ],
          }),
        ],
      }),
    ],
  }),
  topic("external", "6", "External influences on business activity", {
    children: [
      sub("external.economic", "6.1", "Economic issues", {
        children: [
          sub("external.economic.cycle", "6.1.1", "Business cycle", {
            covers: ["bus.economy.business-cycle"],
            objectives: [
              "Describe the stages of the business cycle and how each may affect a business.",
              "Explain the effects of changes in employment, inflation and economic growth on a business.",
            ],
          }),
          sub("external.economic.policy", "6.1.2", "Effects of government policy", {
            covers: ["bus.economy.government-policy"],
            objectives: [
              "Explain the effects of changes in taxes, government spending and interest rates.",
              "Explain how businesses may respond to changes in taxes and interest rates.",
            ],
          }),
        ],
      }),
      sub("external.international", "6.2", "Business and the international economy", {
        children: [
          sub("external.international.globalisation", "6.2.1", "The importance of globalisation", {
            covers: ["bus.economy.globalisation", "bus.trade.protectionism"],
            objectives: [
              "Explain the reasons for globalisation and its opportunities and threats for businesses.",
              "Explain import tariffs and quotas and their effects on businesses.",
            ],
          }),
          sub("external.international.mncs", "6.2.2", "Multinational companies (MNCs)", {
            covers: ["bus.organisation.multinationals"],
            objectives: ["Explain the advantages to a business of becoming an MNC and the advantages and disadvantages for the country where it is located."],
          }),
          sub("external.international.external-costs", "6.2.3", "External costs and benefits", {
            covers: ["bus.economy.external-costs-benefits"],
            objectives: ["Identify the external costs and external benefits of business decisions."],
          }),
          sub("external.international.exchange-rates", "6.2.4", "Exchange rates", {
            covers: ["bus.economy.exchange-rates"],
            objectives: ["Explain appreciation and depreciation and how changes in exchange rates affect importers and exporters (exchange-rate calculations are not assessed)."],
          }),
        ],
      }),
      sub("external.environment", "6.3", "Business and the environment", {
        children: [
          sub("external.environment.issues", "6.3.1", "Environmental issues", {
            covers: ["bus.economy.environmental-issues"],
            objectives: [
              "Explain how business activity can harm the environment and why and how businesses respond.",
              "Explain the effects of legal controls over business activity that affects the environment.",
            ],
          }),
        ],
      }),
      sub("external.ethics", "6.4", "Business and ethical issues", {
        children: [
          sub("external.ethics.issues", "6.4.1", "Ethical issues", {
            covers: ["bus.enterprise.ethics"],
            objectives: [
              "Identify ethical issues that may affect businesses and how businesses may respond.",
              "Evaluate a business being ethical.",
            ],
          }),
        ],
      }),
      sub("external.pressure", "6.5", "Pressure groups", {
        children: [
          sub("external.pressure.role", "6.5.1", "The role of pressure groups", {
            covers: ["bus.economy.pressure-groups"],
            objectives: ["Explain how pressure groups can influence business decisions."],
          }),
        ],
      }),
    ],
  }),
];

const c0264 = {
  board: "cambridge",
  qualification: "igcse",
  subject: "business-studies",
  versionLabel: "2027-2029",
  family: "business-commerce-o",
  title: "Cambridge IGCSE Business (0264)",
  code: "0264",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2029-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE Business 0264 syllabus for 2027, 2028 and 2029 (version 2, March 2025)",
    url: "https://www.cambridgeinternational.org/Images/718123-2027-2029-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "Topic, subtopic and sub-subtopic headings and their numbers (1 to 6, 1.1 to 6.5, 1.1.1 to 6.5.1) are transcribed from the subject content of the official syllabus. Objective codes (sub-subtopic code plus .n) are ours. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Read 2026-10-08 from the official PDF (version 2, published March 2025, for exams in 2027, 2028 and 2029): the six topics, every numbered subtopic, the list of formulas and ratios, the assessment overview, the details of the assessment and the command words.",
    "This syllabus replaces Cambridge IGCSE Business Studies 0450: from 2027 the subject is named Business and has the new code 0264. The catalogue subject cambridge/igcse/business-studies still carries the name 'Business Studies' and code 0450; its name and code need updating in the catalogue (a seed change, not made here).",
    "This version is examined from 2027. A student sitting the examination in 2026 is examined on the previous syllabus (0450, 2024-2026), which is not in the repository; the 2027-2029 version is published as the current version because new students now will sit 2027 or later. Changes listed for 2027: new code and name, content revised and reordered, new subtopics 4.2 (technology) and 4.3 (sustainable production), digital communication added, a list of formulas and ratios added; Paper 1 questions now have four parts instead of five; all Paper 2 part (a) questions are applied.",
    "Assessment overview as read: all candidates take Paper 1 Short Answer and Data Response (1 hour 30 minutes, 80 marks, 50%: four compulsory questions on all the content, each with stimulus material, mixing short answers and structured data responses) and Paper 2 Case Study (1 hour 30 minutes, 80 marks, 50%: four compulsory questions based on one case study provided as an insert, with appendices of data). Grades A* to G; no tiers. The syllabus does not state the marks of each part; each question is worth 20 marks. Assessment-objective weightings: AO1 35%, AO2 30%, AO3 22%, AO4 13% (Paper 1: 40/30/20/10; Paper 2: 30/30/25/15). Calculator use is not stated in the syllabus text read (calculatorAllowed left out); confirm.",
    "Formulas printed in the syllabus (content must use exactly these): market share; labour productivity; total variable cost, total cost, average cost; contribution per unit, break-even output, margin of safety (actual sales minus break-even sales, in units); revenue, gross profit, profit, working capital; gross profit margin, profit margin and ROCE (profit over capital employed, times 100); current ratio and acid test ratio (as a ratio to 1 or as a number). Not assessed: constructing a cash flow forecast, a statement of profit or loss or a statement of financial position, and exchange-rate calculations.",
    "Command words listed: calculate, consider, define, explain, identify, justify, outline, state.",
    "Not in this syllabus (taught in the family for ZIMSEC only): trade documents, wholesaling and retailing in detail, banking services, insurance and assurance, transport, warehousing, consumer protection bodies, money and personal finance, the stock exchange, business planning process and budgets.",
  ],
  overview: "Cambridge IGCSE Business (0264) covers six topics: understanding business activity (enterprise, growth, types of organisation, objectives and stakeholders), people in business (HRM, organisation and management, communication, motivation), marketing (markets, research, the marketing mix, legal controls), operations management (production, technology, sustainability, costs and break-even, quality, location), financial information and decisions (finance, cash flow, profit, financial statements, ratio analysis) and external influences on business activity (economic issues, the international economy, the environment, ethics and pressure groups).",
  assessmentOverview: "All candidates take Paper 1 Short Answer and Data Response (1 hour 30 minutes, four compulsory 20-mark questions with stimulus material, 80 marks, 50%) and Paper 2 Case Study (1 hour 30 minutes, four compulsory 20-mark questions based on one case study insert, 80 marks, 50%).",
  components: [
    { code: "1", name: "Paper 1: Short Answer and Data Response", kind: "WRITTEN", description: "Four compulsory questions on all the subject content, each with stimulus material (tables, graphs, images), mixing short answers and structured data responses.", durationMinutes: 90, maxMarks: 80, weightingPercent: 50 },
    { code: "2", name: "Paper 2: Case Study", kind: "WRITTEN", description: "Four compulsory questions based on one case study, provided as an insert with appendices of data (tables, graphs, newspaper extracts, advertisements).", durationMinutes: 90, maxMarks: 80, weightingPercent: 50 },
  ],
  topics: C0264_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered at most once per syllabus, node keys and codes and
// objective codes are unique, every concept is covered by at least one syllabus; report what each syllabus leaves out.
const coveredAnywhere = new Set();
const SYLLABI = [commerce, bes, c0264];
for (const s of SYLLABI) {
  const seen = new Map();
  const codes = new Set();
  const keys = new Set();
  const nodeCodes = new Set();
  const walk = (nodes) => {
    for (const n of nodes) {
      if (keys.has(n.key)) throw new Error(`${s.subject}: duplicate node key ${n.key}`);
      keys.add(n.key);
      if (nodeCodes.has(n.code)) throw new Error(`${s.subject}: duplicate node code ${n.code}`);
      nodeCodes.add(n.code);
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.board}/${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
        coveredAnywhere.add(c);
      }
      if ((n.children ?? []).length === 0 && !(n.covers ?? []).length) throw new Error(`${s.subject}: leaf ${n.key} covers nothing`);
      for (const o of n.objectives ?? []) {
        if (codes.has(o.code)) throw new Error(`${s.subject}: duplicate objective code ${o.code}`);
        if (nodeCodes.has(o.code)) throw new Error(`${s.subject}: objective code ${o.code} equals a node code`);
        codes.add(o.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${s.topics.length} topics, ${seen.size} concepts covered, ${codes.size} objectives; not covered (${missing.length}): ${missing.join(", ") || "none"}`);
}
const orphans = [...CONCEPT_KEYS].filter((k) => !coveredAnywhere.has(k));
if (orphans.length) throw new Error(`concepts covered by no syllabus: ${orphans.join(", ")}`);

// Cross-check the [COM, BES, CAM] tags in the descriptions against the actual coverage.
const TAG = { COM: commerce, BES: bes, CAM: c0264 };
const coverSets = new Map(SYLLABI.map((s) => [s, new Set()]));
for (const s of SYLLABI) {
  const walk = (nodes) => nodes.forEach((n) => { (n.covers ?? []).forEach((c) => coverSets.get(s).add(c)); walk(n.children ?? []); });
  walk(s.topics);
}
for (const [key, , desc] of CONCEPTS) {
  const m = desc.match(/\[([A-Z, ]+)\]$/);
  if (!m) throw new Error(`${key}: description must end with the [COM, BES, CAM] tag`);
  const tags = m[1].split(",").map((x) => x.trim());
  for (const [tag, s] of Object.entries(TAG)) {
    if (tags.includes(tag) !== coverSets.get(s).has(key)) throw new Error(`${key}: tag ${tag} disagrees with coverage`);
  }
}
console.log(`${CONCEPTS.length} concepts in the registry; tags agree with coverage.`);

const registry = {
  family: "business-commerce-o",
  name: "Commerce and Business (O-Level / IGCSE)",
  level: "O",
  prefix: "bus",
  subjects: ["zimsec/o-level/commerce", "zimsec/o-level/business-studies", "cambridge/igcse/business-studies"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/business-commerce-o.json", registry);
write("content/syllabi/zimsec/o-level/commerce/2015-2022.json", commerce);
write("content/syllabi/zimsec/o-level/business-studies/2015-2022.json", bes);
write("content/syllabi/cambridge/igcse/business-studies/2027-2029.json", c0264);
