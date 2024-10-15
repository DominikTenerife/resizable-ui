import { useEffect, useState } from 'react';
import '../ResizableColumns.css';
import { chapters, chapterContents } from '../content/ChaptersContent';

export default function Example4() {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const setInitialWidths = () => {
            const container1Width = window.$('.container1').width();
            const container2Width = window.$('.container2').width();
            const totalWidth = window.$('.container-main').width();
            const remainingWidth = totalWidth - container1Width - container2Width;

            window.$('.container3').width(remainingWidth);
        };

        const handleTouchResize = (container, event) => {
            let startX = event.touches[0].clientX;
            const initialWidth = window.$(container).width();

            const onTouchMove = (e) => {
                const currentX = e.touches[0].clientX;
                const delta = currentX - startX;
                const newWidth = initialWidth + delta;

                window.$(container).width(newWidth);
                setInitialWidths();
            };

            const onTouchEnd = () => {
                window.removeEventListener('touchmove', onTouchMove);
                window.removeEventListener('touchend', onTouchEnd);
            };

            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
        };

        setInitialWidths();

        if (typeof window.$.fn.resizable === 'function') {
            window.$('.container1').resizable({
                handles: 'e',
                animate: true,
                helper: "ui-resizable-helper",
                resize: function (event, ui) {
                    ui.helper.css('border', '2px dotted blue');
                    const container1Width = ui.size.width;
                    const container2Width = window.$('.container2').width();
                    const remainingWidth = window.$('.container-main').width() - container1Width - container2Width;
                    window.$('.container3').width(remainingWidth);
                },
            });

            window.$('.container2').resizable({
                handles: 'e',
                animate: true,
                helper: "ui-resizable-helper",
                resize: function (event, ui) {
                    ui.helper.css('border', '2px dotted blue');
                    const container1Width = window.$('.container1').width();
                    const container2Width = ui.size.width;
                    const remainingWidth = window.$('.container-main').width() - container1Width - container2Width;
                    window.$('.container3').width(remainingWidth);
                },
            });
        } else {
            console.error('jQuery UI resizable is not available.');
        }

        // Adding touch event listeners for resizing
        window.$('.container1').on('touchstart', (e) => handleTouchResize('.container1', e));
        window.$('.container2').on('touchstart', (e) => handleTouchResize('.container2', e));

        window.addEventListener('resize', setInitialWidths);

        return () => {
            window.removeEventListener('resize', setInitialWidths);
            window.$('.container1').off('touchstart');
            window.$('.container2').off('touchstart');
        };
    }, []);

   

    const handleChapterClick = (chapter) => {
        setSelectedChapter(chapter);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Mock search results for demonstration purposes
        setSearchResults([
            { title: 'Mock Result 1', url: 'https://example.com/1', description: 'This is a description for mock result 1.' },
            { title: 'Mock Result 2', url: 'https://example.com/2', description: 'This is a description for mock result 2.' },
            { title: 'Mock Result 3', url: 'https://example.com/3', description: 'This is a description for mock result 3.' }
        ]);
    };

    return (
        <div className="container-main">
             <div className="container1">
                <h3>Chapters</h3>
                <ul>
                    {chapters.map((chapter, index) => (
                        <li
                            key={index}
                            onClick={() => handleChapterClick(chapter)}
                            className={selectedChapter === chapter ? 'activechapter' : ''}
                        >
                            {chapter}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container2">
                <h3>Search Form</h3>
                <form onSubmit={handleSearchSubmit}>
                    <label htmlFor="search">Search:</label>
                    <input type="text" id="search" name="search" placeholder="Search..." />
                    <br />
                   
                    <br />
                    <button type="submit">Submit</button>
                </form>
                {searchResults.length > 0 && (
                    <div className="search-results">
                        <h4>Search Results:</h4>
                        <ul>
                            {searchResults.map((result, index) => (
                                <li key={index}>
                                    <a href={result.url} target="_blank" rel="noopener noreferrer">{result.title}</a>
                                    <p>{result.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="container3">
                <h3>Chapter Content</h3>
                {selectedChapter ? (
                    <div className="framed-content">
                        <h4>{selectedChapter}</h4>
                        <p>{chapterContents[selectedChapter]}</p>
                    </div>
                ) : (
                    <p>Please select a chapter from the list to view its content.</p>
                )}
            </div>
        </div>
    );
}
