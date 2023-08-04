/**
 * @file index.js
 * @fileOverview This module enables sending emails from a BackEnd AWS application.
 * @author BCA www.baycomp.com
 * @date Created 8/1/2023
 * @copyright Copyright &copy; Bay Computer Associates, Inc. 2021\n
 *      All rights reserved\n
 *      This file contains CONFIDENTIAL material
 */

/** @var {module} nodemailer Email library. */
import nodemailer from 'nodemailer';

/** @var {Object} config Required app configuration values.
 * This assumes that the JSON is located in the app source
 * as Config/config.js defined as const config = <JSON>.
*/
import { config } from '@bca-developer/utilities';

/** @var {module} AWS SDK for communication with Amazon's DynamoDB. */
import AWS from 'aws-sdk';

/**
 * A class for sending an email from the system to a specified user.
 */
class Emailer {

  /**
   * A class for safe read/write access to the billing table.
   * @property  {Mail} transporter SES Mail client.
   */
  constructor() {
    this.transporter = nodemailer.createTransport({
      SES: new AWS.SES()
    });
  }

  /**
   * Send the message to the given user via email.
   * @param {string} user The recipient's email address.
   * @param {string} subject The email subject line.
   * @param {string} message The email message.
   * @param {ReadableStream} attachment Any attachment you'd like to send.
   * @param {string} attachmentFileName The name of the attachment you'd like
   * to send.
   */
  email(user, subject, message, attachment = undefined, attachmentFileName = undefined) {
    this.transporter.sendMail({
      from: `no-reply@${config.domain}`,
      to: user,
      subject: subject,
      html: `<pre>${message}</pre>`,
      attachments: (attachment) ? [{ content: attachment, filename: attachmentFileName }] : undefined,
    },
      (err, info) => {
        if (err) {
          console.error(`Error: ${err}; could not send message: ${message}`);
        }
      });
  }
}

export {
  Emailer
};
