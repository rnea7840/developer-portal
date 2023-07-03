import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { setApis } from '../../../../actions';
import store from '../../../../store';
import { fakeCategories } from '../../../../__mocks__/fakeCategories';
import * as apiQueries from '../../../../apiDefs/query';
import { APICategory, APIDescription } from '../../../../apiDefs/schema';
import { SandboxAccessSuccess } from './SandboxAccessSuccess';

describe('SandboxAccessSuccess with results', () => {
  store.dispatch(setApis(fakeCategories));

  // let allKayAuthAPIsSpy: jest.SpyInstance<APIDescription[]>;
  describe('standard apis', () => {
    beforeEach(() => {
      const allKeyAuthApis: APIDescription[] = Object.values(fakeCategories)
        .flatMap((category: APICategory) => category.apis)
        .sort((a, b) => (a.name > b.name ? 1 : -1));

      jest.spyOn(apiQueries, 'getAllKeyAuthApis').mockReturnValue(allKeyAuthApis);
      render(
        <MemoryRouter>
          <SandboxAccessSuccess
            api={store.getState().apiList.apis.lotr.apis[0]}
            result={{
              apis: ['apikey/rings'],
              clientID: 'gimli',
              clientSecret: 'sonofgloin',
              email: 'gimli@eredluin.com',
              kongUsername: 'Onering',
              redirectURI: 'http://theshire.com',
              token: 'elf-friend',
            }}
          />
        </MemoryRouter>,
      );
    });

    it('displays the API Key generated by the backend', () => {
      expect(screen.getByText('Sandbox key:')).toBeInTheDocument();
      expect(screen.getByText('elf-friend')).toBeInTheDocument();
      expect(screen.getByText('Kong Username:')).toBeInTheDocument();
      expect(screen.getByText('Onering')).toBeInTheDocument();
    });

    it('displays the provided email address', () => {
      expect(
        screen.getByText(/We sent this sandbox access information to your email address:/gm),
      ).toBeInTheDocument();
      expect(screen.getByText(/gimli@eredluin\.com/gm)).toBeInTheDocument();
    });

    it('displays confirmation for only standard APIs', () => {
      expect(screen.getByText(/Rings API/)).toBeInTheDocument();
    });
  });

  describe('oauth acg apis', () => {
    beforeEach(() => {
      const allAuthCodeApis: APIDescription[] = Object.values(fakeCategories)
        .flatMap((category: APICategory) => category.apis)
        .sort((a, b) => (a.name > b.name ? 1 : -1));

      jest.spyOn(apiQueries, 'getAllAuthCodeApis').mockReturnValue(allAuthCodeApis);
      render(
        <MemoryRouter>
          <SandboxAccessSuccess
            api={store.getState().apiList.apis.movies.apis[1]}
            result={{
              apis: ['acg/armageddon'],
              clientID: 'gimli',
              clientSecret: 'sonofgloin',
              email: 'gimli@eredluin.com',
              kongUsername: 'Onering',
              redirectURI: 'http://theshire.com',
              token: 'elf-friend',
            }}
          />
        </MemoryRouter>,
      );
    });

    it('displays the API OAuth Client Id generated by the backend', () => {
      expect(screen.getByText('Your VA API OAuth Client ID:')).toBeInTheDocument();
      expect(screen.getByText('gimli')).toBeInTheDocument();
    });

    it('displays the API OAuth Client Secret generated by the backend', () => {
      expect(screen.getByText('Your VA API OAuth Client Secret:')).toBeInTheDocument();
      expect(screen.getByText('sonofgloin')).toBeInTheDocument();
    });

    it('displays the provided email address', () => {
      expect(
        screen.getByText(/We sent this sandbox access information to your email address:/gm),
      ).toBeInTheDocument();
      expect(screen.getByText(/gimli@eredluin\.com/gm)).toBeInTheDocument();
    });

    it('displays confirmation for only oauth APIs', () => {
      expect(
        screen.queryByText(
          /Benefits Intake API, VA Facilities API, VA Form API, and Veteran Confirmation API/,
        ),
      ).not.toBeInTheDocument();

      expect(screen.getByText(/Armageddon API/)).toBeInTheDocument();
    });
  });

  describe('oauth ccg apis', () => {
    beforeEach(() => {
      render(
        <MemoryRouter>
          <SandboxAccessSuccess
            api={store.getState().apiList.apis.movies.apis[0]}
            result={{
              apis: ['ccg/apollo13'],
              ccgClientId: 'gimli',
              email: 'gimli@eredluin.com',
              kongUsername: 'Onering',
              redirectURI: 'http://theshire.com',
              token: 'elf-friend',
            }}
          />
        </MemoryRouter>,
      );
    });

    it('displays the API OAuth Client Id generated by the backend', () => {
      expect(screen.getByText('Your VA API OAuth Client ID:')).toBeInTheDocument();
      expect(screen.getByText('gimli')).toBeInTheDocument();
    });

    it('does not display an API OAuth Client Secret', () => {
      expect(screen.queryByText('Your VA API OAuth Client Secret:')).not.toBeInTheDocument();
    });

    it('displays the provided email address', () => {
      expect(
        screen.getByText(/We sent this sandbox access information to your email address:/gm),
      ).toBeInTheDocument();
      expect(screen.getByText(/gimli@eredluin\.com/gm)).toBeInTheDocument();
    });

    it('displays confirmation for only oauth APIs', () => {
      expect(
        screen.queryByText(
          /Benefits Intake API, VA Facilities API, VA Form API, and Veteran Confirmation API/,
        ),
      ).not.toBeInTheDocument();

      expect(screen.getByText(/Apollo 13 API/)).toBeInTheDocument();
    });
  });
});