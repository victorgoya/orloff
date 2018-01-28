import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import fetchJsonp from 'fetch-jsonp';
import wtf from "wtf_wikipedia/builds/wtf_wikipedia";
import { setPages } from '../actions/pages';
import objectFromEntries from "object-from-entries";
import { replace } from 'react-router-redux';

function* fetchPages(action) {
   try {
      const response = yield fetchJsonp(`https://${action.language}.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content&grnlimit=10`).then(response => response.json())

      const pages =
        objectFromEntries(
          Object.values(response.query.pages)
            .map((page) =>
              [ page.pageid, { ...wtf.parse(Object.values(page.revisions)[0]['*']), title: page.title, plaintext: wtf.plaintext(Object.values(page.revisions)[0]['*']) } ]
            )
            .reduce((pages, page) => {
              if (page[1].type === "page" && page[1].sections.length > 0 && page[1].plaintext.length > 200) {
                pages.push(page);
              }
              return (pages);
            }, [])
        );

      yield put(setPages(pages));
      yield put(replace(Object.keys(pages)[0]))
   }
   catch (e) {
      yield put({ type: "SET_ERROR", payload: e.message });
   }
}

function* pageSaga() {
  yield takeLatest("LOAD_NEXT_PAGES", fetchPages);
}

export default pageSaga;
