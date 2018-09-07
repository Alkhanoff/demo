<?php
    $lang = get_cookie('lang', TRUE);
?>

<div class="full-width footer white">
    <div class="container">
        <div class="row">
            <div class="span-12 border-top"></div>
        </div>
        <div class="row">
            <div class="span-12">
                <div class="span-13" style="width:145px;">
                    <h3><?php echo ($lang == 'en' ? 'The firm' : 'Firma')?></h3>
                    {footer_menu}
                </div>
                <div class="span-13" style="width:220px;">
                    <h3><?php echo ($lang == 'en' ? 'Services' : 'Servislər')?></h3>
                    {footer_menu_services}
                </div>
                <div class="span-13">
                    <h3><?php echo ($lang == 'en' ? 'Sectors' : 'Sektorlar')?></h3>
                    {footer_menu_sectors}
                </div>
                <div class="span-14">
                    <h3><?php echo ($lang == 'en' ? 'Find a Baker Tilly International member firm: Interactive map' : 'İnteraktiv xəritə')?></h3>
                    <div class="flashContent-1">
                        <a href="http://www.bakertillyinternational.com/web/worldwide-directory.aspx"><img src="{base_url}images/map.png" alt="Worldwide Directory" title="Worldwide Directory"></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row footnote">
            <div class="span-12"><div class="span-6">An independent member of Baker Tilly International</div>
                <ul class="inline unstyled pull-right">
                    <li><a href="{base_url}index/sitemap/">Sitemap</a></li>
                    <li class="last"><a href="{base_url}index/legal_disclaimer/">Legal Disclaimer</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
</div>
<div id="status"></div>
<button {display_save_button} id="save">Save changes</button>
</body>
</html>