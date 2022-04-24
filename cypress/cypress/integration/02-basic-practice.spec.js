/* eslint-disable no-undef */
/// <reference types="cypress" />

// as usual we have a set of blocks organized in
// describe blocks through nesting. The nesting causes a type of
// structural behaviour which is cool btw

describe('Basic Practice', () => {
  beforeEach(() => {
    // guess what, we can visit any page. This is essentially
    // controlling a browser with code. Pretty cool, huh!
    cy.visit('/jetsetter');
  });

  // essentially, invoking is the programmatic
  // way to interact with elements on the page
  describe('Adding a new item', () => {
    // how would the user interact with the page
    // that's kind of like the way these tests work here
    it('should put a new item on the page after clicking on "Add Item"', () => {});

    it('should put a new item in the "Unpacked Items" list', () => {});

    it('should put a new item as the last item in the "Unpacked Items" list', () => {});
  });

  xdescribe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {});

    it('should hide items that do not match whatever is in the filter field', () => {});
  });

  xdescribe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {});
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {});

      it('should remove an item from the page', () => {});
    });
  });

  xdescribe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {});

    it('should empty have all of the items in the "Unpacked" list', () => {});
  });

  xdescribe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {});
  });
});
