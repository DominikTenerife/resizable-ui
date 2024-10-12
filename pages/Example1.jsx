import '../ResizableColumns.css';
import { useEffect } from 'react';

export default function Example1() {
    useEffect(() => {
        const setInitialWidths = () => {
            const container1Width = window.$('.container1').width();
            const container2Width = window.$('.container2').width();
            const totalWidth = window.$('.container-main').width();
            const remainingWidth = totalWidth - container1Width - container2Width;

            window.$('.container3').width(remainingWidth);
        };

        // Set the initial widths when the component first mounts
        setInitialWidths();

        // Make sure jQuery UI is loaded after jQuery
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

        // Recalculate widths if the window is resized
        window.addEventListener('resize', setInitialWidths);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', setInitialWidths);
        };
    }, []);

    return (
        <div className="container-main">
            <div className="container1">Container 1</div>
            <div className="container2">Container 2</div>
            <div className="container3">Container 3</div>
        </div>
    );
}
