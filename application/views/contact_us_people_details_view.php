<div id="breadcrumb">
    <div id="ctl00_PlaceHolderMain_Breadcrumb1" class="webpart">
		<a href="{base_url}">Home</a> <span class="separator">›</span> <span class="current"><?=$this->section_model->getSectionName(9)?></span>
    </div>
</div>
<h2 class="headline-new-width" style="font-size:2.5em;font-weight:normal;"><?=$this->section_model->getSectionName(9)?></h2>

<div style="height:20px;"></div>

<div id="main_content">				        
	<div class="tab-container">
		<div>	
			<div class="tab-nav-holder"> 
				<p class="statement">
					{i_would_like_to_contact}
				</p>
				<ul class="tabs" style="right:0;left:none;">
					<li class="selected"><a href="/contact/">A partner</a></li>
				</ul>
			</div>
		</div>
		<div class="tab-content" id="partner">
			<div class="col-1">   
				<a href="{base_url}contact_us/">&lt; {back_to_listings}</a>
				
       			<div class="details-container">
					<img src="{base_url}uploads/{file}" alt="{name} {lastname}" width="160">
					<div class="details-text">
						<p>
							<strong class="big">{name} {lastname}</strong><br>
							{title}
						</p>
						<table>
							<tbody>
								<tr>
									<td class="border-bottom" style="padding-bottom: 15px;">
										{services}
										{sectors}
                                    </td>
                                    <td class="no-border" style="width:15px;"></td>
                                    <td class="no-border"></td>
                               	</tr>                    
                        		<tr>
                        			<td class="border-bottom" style="padding-top: 15px;padding-bottom: 15px;">
										<strong>T:</strong> {phone}<br>
										<strong>F:</strong> {fax}
                        			</td>
                        			<td class="no-border" style="width:15px;"></td>
                        			<td class="no-border">
										{qualifications}
										{memberships}                                       	
                                    </td>
                        		</tr>
                        	</tbody>
                    	</table>
						<ul id="social-links">
							{linkedin_profile}							
                        </ul>
						<p>
							{text}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>	
</div>