import React from 'react';
import ReactDOMServer from 'react-dom/server';
import HTML from './component/HTML';
import App from '../shared/App';
export default () => (req, res, next) => {
    const { renderToString } = ReactDOMServer;
    const content = renderToString(<App/>);
    const state = JSON.stringify({});
    const css = [
        res.locals.assetPath('bundle.css'),
    ];
    const scripts = [
        res.locals.assetPath('vendor.js'),
        res.locals.assetPath('bundle.js'),
    ];   
    
    res.send(`
        <!DOCTYPE html>
        ${renderToString(<HTML css={css} scripts={scripts} state={state}>
            {content}
        </HTML>)}
    `);
}; 