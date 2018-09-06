<div class="searchSurround pull-right">
    <!-- <form method="post"> -->
      <label for="search" class="searchInput inputBox box-1">
        <input id="search" type="search" title="Search site..." value="<?=label("search")?>..." onkeydown="if(event.keyCode == 13){location.href='<?php echo site_url_lang('main/search'); ?>'+this.value+'/'};" onfocus="if(this.value=='Search site...')this.value='';">
      </label>
      <label for="searchSubmit" class="searchIcon">
        <input id="searchSubmit" type="submit" value="<?=label("search")?>" onclick="location.href='<?php echo site_url_lang('main/search'); ?>'+document.getElementById('search').value+'/';">
      </label>
    <!-- </form> -->
</div>
