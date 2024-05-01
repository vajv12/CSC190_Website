//user can sign up to be up to date with the latest news 
//save emails with timestamp to firebase under subscribers
import React from 'react';

function Newsletter() {
  return (
    <div id="mc_embed_signup">
      <form
        action="https://gmail.us22.list-manage.com/subscribe/post?u=42e7780e85f036908e239c885&amp;id=99cf79e8b7&amp;f_id=00eccae1f0"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        className="validate"
        target="_blank"
      >
        <div id="mc_embed_signup_scroll">
          <h2>Join Our Newsletter</h2>
          
          <div className="mc-field-group">
            <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
            <input
              type="email"
              name="EMAIL"
              className="required email"
              id="mce-EMAIL"
              required=""
              style={{  width:'100%', padding: '10px',}}
             
            />
            <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
          </div>
          <div id="mce-responses" className="clear foot">
            <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
            <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
          </div>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
            {/* Real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
            <input type="text" name="b_42e7780e85f036908e239c885_99cf79e8b7" tabIndex="-1" value="" />
          </div>
          <div className="optionalParent">
            <div className="clear foot">
              <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" 
              style={{ 
                backgroundColor: ' rgb(35, 52, 78)',
                fontSize:'medium',
                color: 'white',
                width: '100px',
                marginTop:'20px',
                padding: '4px 8px',
                 }}/>
              <p style={{ margin: '0px auto' }}>
                <a href="http://eepurl.com/iO9uMY" title="Mailchimp - email marketing made easy and fun">
                  <span style={{ display: 'inline-block', backgroundColor: 'transparent', borderRadius: '4px' }}>
                   
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Newsletter;

