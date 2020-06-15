import React from 'react';
import moment from 'moment';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
     
  getFormatedDate = date => moment(date).isValid() ? moment(date).format('DD/MM/YYYY') : date
  
  render() {  
    const {id, avatar, name, phone, country, admissionDate, company, department} = this.props.data;
    return (
      <article className="contact" key={id} data-testid="contact">            
        <span className="contact__avatar" data-testid="contact-avatar"><img src={avatar} alt="avatar"/></span>
        <span className="contact__data" data-testid="contact-name">{name}</span>
        <span className="contact__data" data-testid="contact-phone">{phone}</span>
        <span className="contact__data" data-testid="contact-country">{country}</span>
        <span className="contact__data" data-testid="contact-date">{this.getFormatedDate(admissionDate)}</span>
        <span className="contact__data" data-testid="contact-company">{company}</span>
        <span className="contact__data" data-testid="contact-department">{department}</span>
			</article>
		);
	}
}

export default Contact;
