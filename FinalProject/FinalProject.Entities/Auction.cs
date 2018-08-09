using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProject.Entities
{
    public class Auction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public AdvertiserUser AdvertiserUser { get; set; }

        public IList<Offer> Offers { get; set; }

        [Required, MaxLength(40)]
        public string Name { get; set; }

        [Required, MaxLength(1000)]
        public string Description { get; set; }

        [Required]
        public IList<Interest> Interests { get; set; }

        public int MinFollowers { get; set; }

        public int MaxPayment { get; set; } //unnecessary?

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }
}
