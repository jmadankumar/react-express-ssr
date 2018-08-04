import React, { Component } from 'react';
import helmet from 'react-helmet';
export default class HTML extends Component {
    render() {
        const head = helmet.renderStatic();
        const { children, css, scripts, state } = this.props;
        return (
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    {head.base.toComponent()}
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    {head.link.toComponent()}
                    {head.script.toComponent()}
                    {css.map((href) => {
                        return (<link key={href} rel="stylesheet" href={href}/>);
                    })}
                    <script type="text/javascript" dangerouslySetInnerHTML={{
                        __html:`window.PRELOADED_STATE = ${state}`
                    }}/>
                </head>
                <body>
                    <div id="root" dangerouslySetInnerHTML={{__html:children}} />
                    {scripts.map((src) => {
                        return (<script src={src} type="text/javascript" />)
                    })}
                </body>
            </html>

        );
    }
}