import React from 'react';
import { TextField, InputLabel } from '@material-ui/core';

export default function Input2 ( props ) {
    const { name, label, value, type, error = null, onChange } = props;
    return ( 
        <div className="div-scroll">
        <div className="row">
          <div className="col s12">
            <div className="col s5">
              <div className="mb-3">
                <label className="right-align" htmlFor="user_email">請輸入您的聯絡信箱</label>
                <label className="right-align small" htmlFor="user_email">Enter your email</label>
              </div>
            </div>
            <div className="col s7">
              <div className="mb-3">
                <input id="user_email" type="text" className="validate" />
              </div>
            </div>
          </div>
          <div className="col s12">
            <div className="col s5">
              <div className="mb-3">
                <label className="right-align" htmlFor="user_password">建立密碼</label>
                <label className="right-align small" htmlFor="user_password">Create a password</label>
              </div>
            </div>
            <div className="col s7">
              <input id="user_password" type="text" className="validate" />
            </div>
          </div>
          <div className="col s12">
            <div className="col s5">
              <div className="input-title">
                <p>*您是否持有歐盟護照或居住在歐洲</p>
                <span>*Are you an EU citizen or holding an EU citizenship?</span>
              </div>
            </div>
            <div className="col s7">
              <div className="d-flex">
                <div className="ml-2">
                  <label>
                    <input name="group1" type="radio" />
                    <span>是</span>
                    <span>YES</span>
                  </label>
                </div>
                <div className="ml-2">
                  <label>
                    <input name="group1" type="radio" />
                    <span>否</span>
                    <span>NO</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 center-align mt-100">
            <p className="text-purple m-0">*本人已閱讀並同意願遵守使用者條款及隱私權政策</p>
            <span className="text-purple">*By clicking Check box, you agree to our Terms and our Privacy Policy.</span>
            <label>
              <input name="group2" type="radio" />
              <span>是</span>
              <span>YES</span>
            </label>
          </div>
        </div>
      </div>
 
    );
}