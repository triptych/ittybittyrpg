<tabs>  
    <tab-headers isclicked={this.isclicked} tabs="{opts.tabs}"></tab-headers>
    <tab-contents tabs="{opts.tabs}"></tab-contents>

    <script>
        this.on('before-mount', function() {
            if (typeof opts.defaultTabIndex !== "undefined") {
                opts.tabs[opts.defaultTabIndex].active = true;
            }
        })

        this.isclicked = (event) => {
            opts.tabs.forEach((tab) => {
                if (event.item.tab.id == tab.id) {
                    tab.active = true;
                } else {
                    tab.active = false;
                }
            });

            this.update();
        }
    </script>
</tabs>  