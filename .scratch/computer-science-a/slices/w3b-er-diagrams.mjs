// Slice w3b: Entity-relationship diagrams and database design (acs.db.er-diagrams, both boards).
import { concept, P, chk } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

const members = 18;
const perMember = 3;
const linkRows = members * perMember;
chk(linkRows, 54);
chk(3 + 1, 4); // bus company: three entity tables plus one link table

concept("acs.db.er-diagrams", { file: "db/er-diagrams", keyPrefix: "db.er-diagrams" }, (b) => {
  mc(b, 1, "RECALL", "What does an entity-relationship diagram show?",
    ["The entities and their relationships", "Correct: with the degree of each relationship."],
    [["The order in which a program runs", "That is a flowchart."], ["The network cables joining computers", "That is a network diagram."], ["The sequence of stages in a project", "That is a project plan."]],
    "An E-R diagram models the entities and relationships of a database.");
  mc(b, 2, "UNDERSTANDING", "In crow's foot notation, what does the three-pronged end of a line mean?",
    ["Many", "Correct: the 'foot' marks the many end of a relationship."],
    [["One", "A single bar marks the one end."], ["Optional", "A small circle marks an optional end."], ["Primary key", "Keys are not shown by the end of a line."]],
    "The crow's foot is drawn at the many end of a relationship.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why can a many-to-many relationship not be stored directly in a relational database?",
    ["One foreign key field can hold only one value, not many", "Correct: a link table is needed."],
    [["Primary keys cannot be unique in such a relationship", "Primary keys can still be unique."], ["SQL does not allow two tables to be joined together by a key", "SQL can join tables."], ["The data would be impossible to sort", "Sorting is not the reason."]],
    "A foreign key holds a single value, so the relationship is split with a link table.");
  mc(b, 2, "APPLICATION", "A shop records customers and the orders they place. One customer places many orders and each order is placed by one customer. Which relationship is this?",
    ["One-to-many", "Correct: one customer, many orders."],
    [["One-to-one", "A customer can have more than one order."], ["Many-to-many", "Each order has only one customer."], ["No relationship", "Orders are placed by customers, so the tables are related."]],
    "One customer has many orders and each order has one customer, so it is one-to-many.", { daily: true });
  mc(b, 3, "APPLICATION", "A shop records customers and the orders they place. One customer places many orders and each order is placed by one customer. In which table is the foreign key placed?",
    ["`Order`, holding the customer's primary key", "Correct: the many side holds the foreign key."],
    [["`Customer`, holding the order's primary key", "That would allow only one order for each customer."], ["Neither, because a link table is always needed", "A link table is only needed for many-to-many relationships."], ["Both tables, each holding the other's primary key", "One foreign key is enough."]],
    "The foreign key goes on the many side: the Order table holds CustomerID.", { hints: ["Which table has many records for each record of the other?"] });
  mc(b, 3, "APPLICATION", "A school database records which teachers teach which classes. A teacher teaches many classes and a class has many teachers. Which design is correct?",
    ["A link table holding a foreign key to each of the two tables", "Correct: it splits the many-to-many relationship."],
    [["A `ClassID` field in the `Teacher` table holding every class", "One field cannot hold several classes."], ["A `TeacherID` field in the `Class` table holding every teacher", "One field cannot hold several teachers."], ["A single table that repeats every field in both entities", "That causes redundancy."]],
    "A many-to-many relationship needs a link table with two foreign keys.", { hints: ["How many teachers does each class have?"] });
  mc(b, 3, "ANALYSIS", "A designer stores `Forename Surname` together in one field called `Name`. Which design principle is broken, and why does it matter?",
    ["Attributes should be atomic; surname searches would be hard", "Correct: each field should hold one value."],
    [["Every table needs a foreign key; the table cannot be linked", "Not every table needs a foreign key."], ["Primary keys must be text; the key cannot be sorted", "Primary keys are not required to be text."], ["Fields must be calculated; the value may be out of date", "Calculated values should not be stored, but the name is not calculated."]],
    "Separate fields for forename and surname make sorting and searching by surname possible.", { hints: ["How would you sort by surname?"] });
  mc(b, 4, "ANALYSIS", "A database for a football league has the entities `Team`, `Player` and `Match`. A team plays many matches and a match involves two teams. Which statement about the relationship between `Team` and `Match` is correct?",
    ["It is many-to-many, so a link table such as `Fixture` is needed", "Correct: each team plays many matches and each match has two teams."],
    [["It is one-to-many, with the foreign key `MatchID` in `Team`", "A team plays many matches, so one MatchID in Team is not enough."], ["It is one-to-one, because each match has one result", "The result of a match is a different matter."], ["It does not need a relationship because the matches are shown in the results", "Stored matches must be linked to the teams that played them."]],
    "Team and Match are many-to-many; a link table resolves it.", { hints: ["How many matches does a team play, and how many teams are in a match?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The foreign key of a one-to-many relationship is placed in the table on the 'one' side.", answer: false, explanation: "False. It goes on the many side and holds the primary key of the one side." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A link table that resolves a many-to-many relationship contains foreign keys to both of the original tables.", answer: true, explanation: "True. It turns the relationship into two one-to-many relationships." });
  b.tf({ d: 3, skill: "UNDERSTANDING", daily: true, hints: ["Does a person's age stay the same?"], stem: "A person's age should be stored in a table instead of the date of birth, because it is quicker to read.", answer: false, explanation: "False. Age changes every year, so the stored value goes out of date. Store the date of birth and calculate the age." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each design step to what is done in it.",
    pairs: [["Identify entities", "List the things about which data must be stored"], ["Identify attributes", "List the properties of each entity"], ["Resolve many-to-many relationships", "Add a link table with two foreign keys"], ["Choose keys", "Decide the primary key of each table and place the foreign keys"], ["Write the schema", "List each table with its fields and keys"]],
    explanation: "These steps are applied in order to move from a scenario to tables." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Which table is on the many side?"],
    stem: "A vet records `Owner` and `Pet`. An owner may have many pets and each pet has one owner. Complete the design.",
    template: "The relationship is {{blank:a}}. The foreign key {{blank:b}} is placed in the {{blank:c}} table.",
    blanks: [
      { id: "a", accepted: ["one-to-many"], choices: ["one-to-many", "one-to-one", "many-to-many", "many-to-one-to-many"] },
      { id: "b", accepted: ["OwnerID"], choices: ["OwnerID", "PetID"] },
      { id: "c", accepted: ["Pet"], choices: ["Owner", "Pet"] },
    ], explanation: "One owner has many pets, so Pet holds the OwnerID foreign key." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the table that is added to resolve a many-to-many relationship.",
    accepted: ["link table", "a link table", "linking table", "junction table", "associative table", "intersection table"], explanation: "A link table (also called a junction or associative table) splits the relationship in two." });
  b.short({ d: 3, skill: "APPLICATION", hints: ["Which kind of table splits a many-to-many relationship?"],
    stem: "A hostel database holds `Student` and `Room`. A student may rent a room in different terms and a room is rented by many students over time. What is the name of the type of table that must be added to store which student has which room? (one or two words)",
    accepted: ["link table", "a link table", "linking table", "junction table", "associative table"], explanation: "A link table (for example Tenancy) stores the StudentID and RoomID." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, unit: undefined, hints: ["One row is stored for each pairing of a member with an activity."],
    stem: `A youth club has ${members} members. Each member takes part in exactly ${perMember} of the club's activities. A link table \`Participation\` stores one row for each member and activity pair. How many rows does the table hold?`,
    value: linkRows, wrong: [members + perMember, members], workedSolution: `1. Each member has ${perMember} pairs.\n2. Rows = ${members} × ${perMember} = ${linkRows}.`, explanation: `${members} × ${perMember} = ${linkRows} rows.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Count the entity tables, then the link tables."],
    stem: "A bus company has the entities Driver, Bus and Route. Each driver drives many buses over time and each bus is driven by many drivers. Each bus runs on one route, and a route has many buses. After the many-to-many relationship is resolved, how many tables are needed in total?",
    value: 4, wrong: [3, 5], workedSolution: "1. Entity tables: Driver, Bus, Route = 3.\n2. Driver and Bus are many-to-many, so one link table is added = 1.\n3. Total = 4.", explanation: "Three entity tables and one link table." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Say what the problem is, then what the link table holds."],
    stem: "Explain why a link table is needed to store a many-to-many relationship. [3]",
    points: ["A relational database cannot store a many-to-many relationship directly, because a foreign key field can hold only one value", "The link table holds a foreign key to each of the two tables", "This turns the relationship into two one-to-many relationships"],
    modelAnswer: "A foreign key can hold only one value, so a many-to-many relationship cannot be stored directly. The link table holds a foreign key to each of the two tables, which turns the relationship into two one-to-many relationships.",
    explanation: "Foreign key limit, two foreign keys, two one-to-many relationships." });
  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3, hints: ["Look for the nouns in the description."],
    stem: "A library records books, the authors who wrote them and the members who borrow them. Identify three entities that the database must hold and give one attribute for each. [3]",
    points: ["Book with an attribute such as Title or ISBN", "Author with an attribute such as Name", "Member with an attribute such as Name or Phone (Loan is also an acceptable entity)"],
    modelAnswer: "Book (Title), Author (Name) and Member (Phone).",
    explanation: "Entities are the nouns about which data is stored." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Consider each of the two attributes in turn."],
    stem: "A designer proposes that the `Member` table stores `Age` and `FullName`. Suggest two improvements to the design and give a reason for each. [4]",
    points: ["Store date of birth instead of age", "Age changes every year and would go out of date; it can be calculated from the date of birth", "Split FullName into Forename and Surname", "Each attribute should hold one value so that searches and sorting by surname work"],
    modelAnswer: "Store the date of birth instead of age, because age goes out of date and can be calculated. Split the full name into forename and surname, because each field should hold a single value so that sorting and searching by surname are possible.",
    explanation: "Avoid stored calculated values and non-atomic fields." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["A tenant rents one flat at a time but over the years a flat has many tenants."],
    explanation: "Each flat has one block and each block has many flats; the pairs are Block-Flat and Flat-Tenancy.",
    stem: "A letting agent in Harare records Blocks of flats, Flats and Tenants. Each block contains many flats and each flat is in one block. A tenant may rent several flats over the years and a flat has several tenants over the years.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the type of relationship between `Block` and `Flat`.", accepted: ["one-to-many", "one to many", "1:m"], normalise: ["trim", "lowercase", "collapse_whitespace"], explanation: "One block, many flats." }),
      P.short({ label: "(b)", marks: 1, stem: "State the type of relationship between `Flat` and `Tenant`.", accepted: ["many-to-many", "many to many", "m:m", "m:n"], normalise: ["trim", "lowercase", "collapse_whitespace"], explanation: "Many tenants over the years; many flats over the years." }),
      P.short({ label: "(c)", marks: 1, stem: "In which table is the foreign key `BlockID` placed?", accepted: ["Flat", "the Flat table"], explanation: "Flat is on the many side." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe how the relationship in part (b) is stored in the database.", points: ["A link table such as Tenancy is added", "It has a foreign key FlatID and a foreign key TenantID", "It may also hold the start and end dates of the tenancy, and the primary key is a new identifier or the combination of keys and start date"], modelAnswer: "A link table, Tenancy, is added with the foreign keys FlatID and TenantID, and the start and end dates of the tenancy.", explanation: "The link table splits the relationship." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Find the entities first.", "Look for a many-to-many relationship."],
    explanation: "Entities Coach, Player, Team; players join many teams over time and a team has many players, so a link table is needed.",
    stem: "A netball club in Kariba has Teams, Players and Coaches. Each coach looks after one team, and a team has one coach. A player may play for different teams in different seasons, and a team has many players in a season.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the relationship between `Coach` and `Team`.", accepted: ["one-to-one", "one to one", "1:1"], normalise: ["trim", "lowercase", "collapse_whitespace"], explanation: "Each coach looks after one team and each team has one coach." }),
      P.short({ label: "(b)", marks: 1, stem: "State the relationship between `Player` and `Team`.", accepted: ["many-to-many", "many to many", "m:m", "m:n"], normalise: ["trim", "lowercase", "collapse_whitespace"], explanation: "Players play for many teams over time; teams have many players." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the design of the table that resolves the relationship in part (b). Name the table and its fields.", points: ["A link table such as Squad is added", "It contains the foreign keys PlayerID and TeamID", "A Season field (or similar) is included so that the same player and team can be recorded in different seasons; the key includes it"], modelAnswer: "Squad(PlayerID, TeamID, Season). PlayerID and TeamID are foreign keys and the primary key is the three fields together.", explanation: "Link table with the two foreign keys and the season." }),
      P.manual({ label: "(d)", marks: 3, stem: "Write the relational schema for the three entity tables, marking the primary keys and foreign keys.", points: ["Coach with CoachID as primary key", "Player with PlayerID as primary key", "Team with TeamID as primary key and CoachID as a foreign key (or Coach holding TeamID)"], modelAnswer: "Coach(CoachID, Name); Player(PlayerID, Name, DateOfBirth); Team(TeamID, TeamName, CoachID) where CoachID is a foreign key.", explanation: "Each table has an identifier; the one-to-one link needs one foreign key." }),
    ] });
  b.card("DEFINITION", "Entity-relationship (E-R) diagram", "A diagram of the entities in a system and the relationships between them, with the degree of each relationship.");
  b.card("CONCEPT", "Crow's foot notation", "A single bar means one; three lines like a bird's foot mean many; a circle means optional.");
  b.card("CONCEPT", "Many-to-many relationship", "Cannot be stored directly. Add a link table holding a foreign key to each table.");
  b.card("CONCEPT", "Where to place the foreign key", "In the table on the many side of a one-to-many relationship; it holds the primary key of the one side.");
  b.card("FACT", "Steps in database design", "Find entities, list attributes, find relationships and degrees, remove many-to-many relationships, choose keys, write the schema.");
  b.card("DEFINITION", "Link table", "A table with foreign keys to two other tables that turns a many-to-many relationship into two one-to-many relationships.");
  b.card("CONCEPT", "Atomic attributes", "Each field holds one value (forename and surname in separate fields).");
  b.card("CONCEPT", "Calculated data", "Do not store values that can be calculated (store date of birth, not age).");
  b.card("CONCEPT", "Composite primary key", "A key made of two or more fields that are unique only together, such as StudentID with SubjectID in a link table.");
});
