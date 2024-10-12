import { useEffect, useState } from 'react';
import '../ResizableColumns.css';

export default function Example1() {
    const [selectedChapter, setSelectedChapter] = useState(null);

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

    const chapters = [
        'Chapter 1: Introduction',
        'Chapter 2: Getting Started',
        'Chapter 3: Advanced Topics',
        'Chapter 4: Conclusion'
    ];

    const handleChapterClick = (chapter) => {
        setSelectedChapter(chapter);
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
                <h3>Search Form</h3>
                <form>
                    <label htmlFor="search">Search:</label>
                    <input type="text" id="search" name="search" placeholder="Search..." />
                    <br />
                    <label htmlFor="filter">Filter:</label>
                    <input type="text" id="filter" name="filter" placeholder="Filter..." />
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div className="container3">
                <h3>Chapter Content</h3>
                {selectedChapter ? (
                    <div>
                        <h4>{selectedChapter}</h4>
                        <p>This is the content for {selectedChapter}. Here, you can add more details, examples, or any other relevant information.</p>
                    </div>
                ) : (
                    <p>Please select a chapter from the list to view its content.</p>
                )}
            </div>
        </div>
    );
}
