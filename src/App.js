import React, { useState, useEffect } from 'react';
import AlanBtn from '@alan-ai/alan-sdk-web';
import { getAllByAltText } from '@testing-library/react';

import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards'
import useStyles from './styles.js';
import alanBtn from '@alan-ai/alan-sdk-web';

const alankey = '54121bb222d9b77167be5fcec23d4bba2e956eca572e1d8b807a3e2338fdd0dc/stage';

const App  = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] = useState(-1);
    const classes = useStyles();

    useEffect(() => {
        AlanBtn({
            key: alankey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                }else if (command === 'open'){
                   const parsedNumber = number.length > 2 ? wordsToNumbers(number, {}) : number;
                   const article = articles[parsedNumber - 1];

                   if(parsedNumber > 20){
                       alanBtn().playText('Please try that again.')
                   }else if (article){
                       window.open(article.url, '_blank');
                       alanBtn().playText('Opening...');
                   }
                }
            }
        })
    }, [])


    return(
        <div>
            <div className={classes.logoContainer}>
                <img src='https://s3-us-west-1.amazonaws.com/welcome.ai/attachments/attachments/000/017/901/thumb/alan-logo-vertical-color.png?1571682334' className={classes.alanLogo} alt='alan logo'/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle}/>
        </div>
    );
}

export default App;
