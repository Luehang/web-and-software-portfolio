import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProjectSorter from './../components/ProjectSorter'

export default class ContactContainer extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        /********************************************
        step by step message form js
        *********************************************/
        $('.message-container .button').click(function(){
            var $btn = $(this),
                $step = $btn.parents('.modal-body'),
                stepIndex = $step.index(),
                $pag = $('.modal-header span').eq(stepIndex);
        
            if(stepIndex === 0 || stepIndex === 1) { step1($step, $pag); }
            else { step3($step, $pag); }
            
        });
        
        function step1($step, $pag){
            // animate the step out
            $step.addClass('animate-out');
            
            // animate the step in
            setTimeout(function(){
            $step.removeClass('animate-out is-showing')
                .next().addClass('animate-in');
            $pag.removeClass('is-active')
                    .next().addClass('is-active');
            }, 600);
            
            // after the animation, adjust the classes
            setTimeout(function(){
            $step.next().removeClass('animate-in')
                    .addClass('is-showing');
            
            }, 1200);
        }
        
        function step3($step, $pag){
            // animate the step out
            $step.parents('.modal-wrap').addClass('animate-up');
        
            setTimeout(function(){
            $('.rerun-button').css('display', 'inline-block');
            }, 300);
        }
        
        $('.rerun-button').click(function(){
        $('.modal-wrap').removeClass('animate-up')
                            .find('.modal-body')
                            .first().addClass('is-showing')
                            .siblings().removeClass('is-showing');
        
            $('.modal-header span').first().addClass('is-active')
                                    .siblings().removeClass('is-active');
        $(this).hide();
        });
            
        /********************************************
         form submit js
        *********************************************/
        $('#message-submit').click(function(event) {
            const $nameField = $('#name');
            const $emailField = $('#email');
            const $messageField = $('#message');
            const $alert = $('.alert');
            event.preventDefault();
            $.ajax({
                type: "POST",
                url: `/send-message`,
                data: { 
                    name: $nameField.val(),
                    email: $emailField.val(),
                    message: $messageField.val()
                },
                dataType: "json",
                cache: true,
                success: function (data) {
                    if (data.success) {
                        $alert.addClass('success');
                        $alert.html(`<div>${data.message}</div>`);
                        $alert.toggleClass('is-open');
                        setTimeout(() => {
                            $alert.removeClass('success');
                            $alert.toggleClass('is-open');
                        }, 4000);
                    } else if (data.success === false) {
                        $alert.addClass('danger');
                        $alert.html(`<div>${data.message}</div>`);
                        $alert.toggleClass('is-open');
                        setTimeout(() => {
                            $alert.removeClass('danger');
                            $alert.toggleClass('is-open');
                        }, 4000);
                    } else {
                        $alert.addClass('danger');
                        $alert.html(`<div>Message was not sent successfully.  Please try again.</div>`);
                        $alert.toggleClass('is-open');
                        setTimeout(() => {
                            $alert.removeClass('danger');
                            $alert.toggleClass('is-open');
                        }, 4000);
                    }
                } 
            }); // end ajax request
        }); // end form submit
    }
    render() {
        return (
            <div id="contact">
                <section className="body-container">
                    <h1>CONTACT</h1>
                    <div className="line-separation"></div>
                    <div className="message-container">
                        <div className="modal-wrap">
                            <div className="modal-header"><span className="is-active"></span><span></span><span></span></div>
                                <div className="modal-bodies">
                                    <form id="message-form" action="/send-message" method="POST">
                                        <div className="modal-body modal-body-step-1 is-showing">
                                            <div className="title">Step 1</div>
                                            <div className="description">Have a question or want to work together?</div>
                                            <input type="text" id="name" placeholder="Name" name="name" autoComplete="name"/>
                                            <input type="text" id="email" placeholder="Email" name="email" autoComplete="email"/>
                                            <div className="text-center">
                                                <div className="button">Next</div>
                                            </div>
                                        </div>
                                        <div className="modal-body modal-body-step-2">
                                            <div className="title">Step 2</div>
                                            <div className="description">Write your message.</div>
                                            <div className="text-center">
                                                <textarea id="message" placeholder="Message" rows="5" name="message" autoCapitalize="autoCapitalize" spellCheck="spellcheck"></textarea>
                                                <div id="message-submit" className="button">Send Message</div>
                                            </div>
                                        </div>
                                        <div className="modal-body modal-body-step-3">
                                            <div className="title">Step 3</div>
                                            <div className="description">Message sent! Please wait for the success notification or try again. Thank you.</div>
                                            <div className="text-center">
                                                <div className="button">Done!</div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        <div className="text-center">
                            <div className="rerun-button">Send Another Message</div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

// ContactContainer.propTypes = {
//     handleProjectSortChange: PropTypes.func.isRequired,
//     sorter_settings: PropTypes.object.isRequired
// }