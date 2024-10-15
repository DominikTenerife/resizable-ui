import { useEffect, useState } from 'react';
import '../ResizableColumns.css';
import { chapters, chapterContents } from '../content/ChaptersContent';

export default function Example1() {
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    
    // Track the drag state
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
    const [initialSize, setInitialSize] = useState({ width: 150, height: 150 });
    const [offset, setOffset] = useState({ top: 0, left: 0 });

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

            // Make the new element draggable and resizable
            window.$('.draggable-resizable').draggable({
                containment: 'window'
            }).resizable({
                minWidth: 50,
                minHeight: 50
            });
        } else {
            console.error('jQuery UI resizable is not available.');
        }

        window.$('.container1').on('touchstart', (e) => handleTouchResize('.container1', e));
        window.$('.container2').on('touchstart', (e) => handleTouchResize('.container2', e));

        // Handle touch events for the draggable-resizable element
        const handleTouchStart = (e) => {
            if (e.touches.length === 1) {
                setIsDragging(true);
                setInitialPos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
                const rect = e.currentTarget.getBoundingClientRect();
                setOffset({
                    top: rect.top,
                    left: rect.left,
                });
            }
        };

        const handleTouchMove = (e) => {
            if (isDragging) {
                const dx = e.touches[0].clientX - initialPos.x;
                const dy = e.touches[0].clientY - initialPos.y;

                e.currentTarget.style.top = `${offset.top + dy}px`;
                e.currentTarget.style.left = `${offset.left + dx}px`;
                e.currentTarget.style.position = 'fixed';
            }
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        // Attach touch event listeners
        const draggableElement = window.$('.draggable-resizable');
        draggableElement.on('touchstart', handleTouchStart);
        draggableElement.on('touchmove', handleTouchMove);
        draggableElement.on('touchend', handleTouchEnd);

        window.addEventListener('resize', setInitialWidths);

        return () => {
            window.removeEventListener('resize', setInitialWidths);
            window.$('.container1').off('touchstart');
            window.$('.container2').off('touchstart');
            draggableElement.off('touchstart');
            draggableElement.off('touchmove');
            draggableElement.off('touchend');
        };
    }, [isDragging, initialPos, offset]);

    const handleChapterClick = (chapter) => {
        setSelectedChapter(chapter);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
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
            <div
                className="draggable-resizable"
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '150px',
                    height: '150px',
                    backgroundColor: 'orange',
                    touchAction: 'none', // Prevent default touch actions
                }}
            >
                <h4>Draggable and Resizable Element</h4>
            </div>
        </div>
    );
}
