import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import * as NewsData from '../__mocks__/news.test.yml';
import SideNav from '../components/SideNav';
import toHtmlId from '../toHtmlId';
import News, { DataSection, NewsItem } from './News';

describe('News', () => {
  let news: ReactWrapper;
  beforeEach(() => {
    news = mount(
      <MemoryRouter initialEntries={['/news']}>
        <News />
      </MemoryRouter>,
    );
  });

  it('renders successfully', () => {
    expect(() => {
      mount(
        <MemoryRouter initialEntries={['/news']}>
          <News />
        </MemoryRouter>,
      );
    }).not.toThrow();
  });

  describe('side nav', () => {
    it('renders the side nav', () => {
      expect(news.find(SideNav)).toHaveLength(1);
    });

    it('has the expected side nav entries', () => {
      const sideNav = news.find(SideNav).first();
      const navLinks = sideNav.find('a');
      expect(navLinks).toHaveLength(NewsData.sections.length + 1);

      expect(navLinks.first().text()).toBe('Overview');
      expect(navLinks.first().prop('href')).toBe('/news');

      NewsData.sections.forEach((data: DataSection, index: number) => {
        const navLink: ReactWrapper = navLinks.at(index + 1);
        expect(navLink.text()).toBe(data.title);
        expect(navLink.prop('href')).toBe(`/news#${toHtmlId(data.title)}`);
      });
    });
  });

  describe('card links', () => {
    it('has a card link for each section', () => {
      const cardLinks = news.find('a.va-api-card');
      expect(cardLinks).toHaveLength(NewsData.sections.length);
      NewsData.sections.forEach((section: DataSection, index: number) => {
        const cardLink = cardLinks.at(index);
        expect(cardLink.prop('href')).toBe(`/news#${toHtmlId(section.title)}`);

        const name = cardLink.find('.va-api-name');
        const description = cardLink.find('.va-api-description');
        expect(name.text()).toBe(section.title);
        expect(description.text()).toBe(section.description);
      });
    });
  });

  describe('sections', () => {
    it('renders eacb section', () => {
      NewsData.sections.forEach((section: DataSection, index: number) => {
        const newsSection = news.find(`section#${toHtmlId(section.title)}`);
        expect(newsSection).toHaveLength(1);

        const h2 = newsSection.find('h2');
        expect(h2).toHaveLength(1);
        expect(h2.text()).toBe(section.title);
      });
    });

    NewsData.sections.forEach((section: DataSection) => {
      it(`renders all items in the "${section.title}" section`, () => {
        const newsSection = news.find(`section#${toHtmlId(section.title)}`);
        expect(newsSection).toHaveLength(1);
        const items = newsSection.children().not('h2');
        expect(items.length).toBe(section.items.length);

        section.items.forEach((expected: NewsItem, index: number) => {
          let link = items
            .at(index)
            .find('a')
            .first();
          if (section.media && link.text() === '') {
            link = items
              .at(index)
              .find('a')
              .at(1);
          }

          expect(link.text()).toBe(expected.title);
          expect(link.prop('href')).toBe(expected.url);

          const info = items.at(index).find('strong');
          expect(info.text()).toBe(
            `${expected.date}${expected.source ? ` | ${expected.source}` : ''}`,
          );
        });
      });
    });
  });
});
