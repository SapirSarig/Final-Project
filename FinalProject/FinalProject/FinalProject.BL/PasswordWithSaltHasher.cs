using FinalProject.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.BL
{
    public class PasswordWithSaltHasher
    {
        public HashWithSaltResult HashWithSalt(string password, string email)
        {
            SHA256 sha256 = SHA256Managed.Create();
            byte[] passwordAsBytes = Encoding.UTF8.GetBytes(password);
            byte[] saltBytes = Encoding.UTF8.GetBytes("sadasda@#!-aA../" + email + "SDAK@D,ASD.AAasd$SDKMGE=#@$#%^%");
            List<byte> passwordWithSaltBytes = new List<byte>();
            passwordWithSaltBytes.AddRange(passwordAsBytes);
            passwordWithSaltBytes.AddRange(saltBytes);
            byte[] digestBytes = sha256.ComputeHash(passwordWithSaltBytes.ToArray());
            return new HashWithSaltResult(Convert.ToBase64String(saltBytes), Convert.ToBase64String(digestBytes));
        }
    }
}
