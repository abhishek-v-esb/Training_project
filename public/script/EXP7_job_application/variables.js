const form = document.querySelector("#form");
const page = {
  1: "basic-details",
  2: "education",
  3: "workExp",
  4: "language",
  5: "technology",
  6: "referenceContact",
  7: "preference",
};
const required = [
  [
    "firstname",
    "lastname",
    "designation",
    "address1",
    "address2",
    "email",
    "phone",
    "zipcode",
    "states",
    "cities",
    "dob",
    "relationship",
  ],
  [
    "ssc",
    "passingyearssc",
    "passingpercentagessc",
    "hsc",
    "passingyearhsc",
    "passingpercentagehsc",
    "bachelor",
    "passingyearbachelor",
    "passingpercentagebachelor",
    "master",
    "passingyearmaster",
    "passingpercentagemaster",
  ],
  [
    "company1designation",
    "company1from",
    "company1to",
    "company2designation",
    "company2from",
    "company2to",
  ],
  [],
  [],
  ["ref1relation", "ref1contact", "ref2relation", "ref2contact"],
  [],
];
const isNum = [
  ["phone", "zipcode"],
  [
    "passingpercentagessc",
    "passingpercentagehsc",
    "passingpercentagebachelor",
    "passingpercentagemaster",
    "passingyearssc",
    "passingyearhsc",
    "passingyearmaster",
    "passingyearbachelor",
  ],
  [],
  [],
  [],
  ["ref1contact", "ref2contact"],
  [],
];
const isStr = [
  ["firstname", "lastname", "designation"],
  ["ssc", "hsc", "bachelor", "master"],
  [],
  [],
  [],
  ["ref1relation", "ref2relation"],
  [],
];
const email = ["email"];
const merge = (a, b, predicate = (a, b) => a === b) => {
  const c = [...a];
  b.forEach((bItem) =>
    c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)
  );
  return c;
};

function showPage(pageNum) {
  const view = page[pageNum];
  document.getElementById(`${view}`).style.display = "block";
  document.getElementById(`${view}_head`).classList.add("selected-head");
}
