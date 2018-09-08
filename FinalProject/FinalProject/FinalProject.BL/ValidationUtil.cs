using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using System.Net.Mail;

namespace FinalProject.BL
{
    public static class ValidationUtil
    {
        public static bool ValidateInfluenceUser(InfluencerUser user)
        {
            if (!validateUser(user))
                return false;
            if (user.DateOfBirth > DateTime.Now )
                return false;
            return true;
        }

        public static bool ValidateBusinessUser(BusinessUser user)
        {
            if (!validateUser(user))
                return false;
            if (!(Uri.IsWellFormedUriString(user.WebsiteLink, UriKind.RelativeOrAbsolute)))
                return false;
            return true;
        }

        private static bool validateUser(User user)
        {
            //Name
            if(string.IsNullOrEmpty(user.Name) || user.Name.Any(c => char.IsDigit(c)))
                return false;

            //Email
            try
            {
                MailAddress m = new MailAddress(user.Email);
            }
            catch (FormatException)
            {
                return false;
            }

            //Password
            var hasNumber = new Regex(@"[0-9]+");
            var hasLowerChar = new Regex(@"[a-z]+");
            var hasMinimum6Chars = new Regex(@".{6,}");

            if (!(hasNumber.IsMatch(user.Password) && hasLowerChar.IsMatch(user.Password) && hasMinimum6Chars.IsMatch(user.Password)))
                return false;

            return true;
        }
    }
}
