using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class Auction
    {
        [Key]
        public int Id { get; set; }

        public virtual int UserId { get; set; }
        //Auction()
        //{
        //    Offers = new HashSet<Offer>();
        //    Interests = new HashSet<Interest>();
        //}

        //[Key]
        //public int Id { get; set; }

        //[Required]
        //public AdvertiserUser AdvertiserUser { get; set; }

        //public ICollection<Offer> Offers { get; set; }

        //[Required, MaxLength(40)]
        //public string Name { get; set; }

        //[Required, MaxLength(1000)]
        //public string Description { get; set; }

        //[Required]
        //public ICollection<Interest> Interests { get; set; }

        //public int MinFollowers { get; set; }

        //public int MaxPayment { get; set; } //unnecessary?

        //[Required]
        //public DateTime StartDate { get; set; }

        //[Required]
        //public DateTime EndDate { get; set; }
    }
}
