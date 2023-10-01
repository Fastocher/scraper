import type { Ads } from "../../app/models/ads.server";

Cypress.setMaxListeners(10);

describe("Collecting Data", () => {
  let page = 1;

  before(() => {
    cy.task("db:clearAds");
    cy.task("log", `Clear DB`);
    cy.visit(`https://www.sreality.cz/en/search/for-sale/apartments`);
    cy.task(
      "log",
      `Open a link "https://www.sreality.cz/en/search/for-sale/apartments"`,
    );
  });

  beforeEach(() => {
    cy.removeAllListeners();
    cy.clearCookies();
  });

  function collectDataOnPage() {
    if (page > 25) {
      return;
    }

    const ads: Ads[] = [];
    cy.task("log", `Current page ${page}`);
    cy.get(".dir-property-list > div.property")
      .each(($el) => {
        const oneAd = { title: "", images: [] };

        $el.find("a > img").each(function () {
          // cy.log(`${this.src} img`);
          if (this.src === "") return;
          oneAd.images.push(this.src);
        });

        $el.find(".name").each(function () {
          // cy.log(`${this.textContent} text`);
          if (this.textContent === "") return;
          oneAd.title = this.textContent!;
        });

        ads.push(oneAd);
        cy.task("log", ` > Items collected ${ads.length + (page - 1) * 20}`);
      })
      .then(() => {
        cy.wrap(ads).should("not.be.empty");

        ads.forEach((ad) => {
          cy.task("db:createAds", {
            title: ad.title,
            images: ad.images,
          } as Ads);
        });
      })
      .then(() => {
        cy.get("a.paging-next.btn-paging-pn").then(($button) => {
          const el = $button.first();

          if (el.attr("disabled") === "disabled") {
            cy.log("Last page!");
          } else {
            page++;
            cy.wrap(el).wait(500).click().then(collectDataOnPage);
          }
        });
      });
  }

  it(`collect data`, () => {
    collectDataOnPage();
  });

  //       // too slow way
  //       // cy.get(".dir-property-list > div.property")
  //       //   .each(($el) => {
  //       //     const oneAd = { title: "", images: [] };
  //       //     cy.wrap($el).within(() => {
  //       //       cy.get("img")
  //       //         .should("not.be.NaN")
  //       //         .each(($img) => {
  //       //           cy.wrap($img)
  //       //             .should("have.attr", "src")
  //       //             .then(() => {
  //       //               const src = $img.attr("src");
  //       //               if (src?.trim().includes("https")) {
  //       //                 oneAd.images.push(src);
  //       //               }
  //       //             });
  //       //         });

  //       //       cy.get(".name")
  //       //         .should("not.be.NaN")
  //       //         .then(($text) => {
  //       //           oneAd.title = $text.text();
  //       //         });

  //       //       ads.push(oneAd);
  //       //     });
  //       //   })
  //       .then(() => {
  //         cy.wrap(ads).should("not.be.empty");

  //         ads.forEach((ad) => {
  //           cy.task("db:createAds", {
  //             title: ad.title,
  //             images: ad.images,
  //           } as Ads);
  //         });
  //       });
});
