import { useEffect, useState } from 'react';
import '../ResizableColumns.css';
import { chapters, chapterContents } from '../content/ChaptersContent';

export default function Example1() {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const setInitialWidths = () => {
            const container1Width = window.$('.container1').width();
            const container2Width = window.$('.container2').width();
            const totalWidth = window.$('.container-main').width();
            const remainingWidth = totalWidth - container1Width - container2Width;

            window.$('.container3').width(remainingWidth);
        };

        setInitialWidths();

        if (typeof window.$.fn.resizable === 'function') {
            window.$('.container1').resizable({
                handles: 'e',
                resize: function (event, ui) {
                    const container1Width = ui.size.width;
                    const container2Width = window.$('.container2').width();
                    const remainingWidth = window.$('.container-main').width() - container1Width - container2Width;
                    window.$('.container3').width(remainingWidth);
                },
            });

            window.$('.container2').resizable({
                handles: 'e',
                resize: function (event, ui) {
                    const container1Width = window.$('.container1').width();
                    const container2Width = ui.size.width;
                    const remainingWidth = window.$('.container-main').width() - container1Width - container2Width;
                    window.$('.container3').width(remainingWidth);
                },
            });
        } else {
            console.error('jQuery UI resizable is not available.');
        }

        window.addEventListener('resize', setInitialWidths);

        return () => {
            window.removeEventListener('resize', setInitialWidths);
        };
    }, []);

    const handleChapterClick = (chapter) => {
        setSelectedChapter(chapter);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        // Hardcoded mock search results
        const mockResults = [
            {
                title: 'Example Search Result 1',
                url: 'https://www.example.com/1',
                snippet: 'This is a description for the first example search result.',
            },
            {
                title: 'Example Search Result 2',
                url: 'https://www.example.com/2',
                snippet: 'This is a description for the second example search result.',
            },
            {
                title: 'Example Search Result 3',
                url: 'https://www.example.com/3',
                snippet: 'This is a description for the third example search result.',
            },
        ];

        setSearchResults(mockResults);
    };

    return (
        <div className="container-main">
            <div className="container1">
                <h3>Chapters</h3>
                <ul>
                    {chapters.map((chapter, index) => (
                        <li key={index} onClick={() => handleChapterClick(chapter)}>
                            {chapter}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container2">
                <h3>Internet Search</h3>
                <form onSubmit={handleSearchSubmit}>
                    <label htmlFor="search">Search:</label>
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search the web..."
                    />
                    <br />
                    <button type="submit">Search</button>
                </form>
                <div className="search-results">
                    <h4>Search Results</h4>
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result, index) => (
                                <li key={index}>
                                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                                        {result.title}
                                    </a>
                                    <p>{result.snippet}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No results found. Try searching for something else.</p>
                    )}
                </div>
            </div>
            <div className="container3">
                <div className="framed-content">
                    <h3>Chapter Content</h3>
                    {selectedChapter ? (
                        <div>
                            <h4>{selectedChapter}</h4>
                            <p>{chapterContents[selectedChapter]}</p>
                        </div>
                    ) : (
                        <p>Please select a chapter from the list to view its content.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
