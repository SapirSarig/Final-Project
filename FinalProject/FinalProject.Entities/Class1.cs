using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FinalProject.Entities
{
    public abstract class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        //[RegularExpression(@.......)]
        public string Email { get; set; }

        [Required, MinLength(6), MaxLength(12)]
        //[RegularExpression(@.......)]
        public string Password { get; set; }

        public string Picture { get; set; }

        public string Description { get; set; }
    }


    public class InfluencerUser : User
    {
        [Required, MaxLength(20)]
        public string FirstName { get; set; }

        [Required, MaxLength(40)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public IList<SocialNetwork> SocialNetworks { get; set; }

        [Required]
        public IList<Interest> Interests { get; set; }
    }


    public class AdvertiserUser : User
    {
        [Required, MaxLength(40)]
        public string CompanyName { get; set; }

        [Required]
        //[RegularExpression(@.......)]
        public string WebsiteLink { get; set; }
    }


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


    public class Offer
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public Auction Auction { get; set; }

        [Required]
        public InfluencerUser InfluencerUser { get; set; }

        public string UserRequirements { get; set; }

        public int Price { get; set; }

        [Required]
        public Type Type { get; set; }

        [Required]
        public string OfferDescription { get; set; }

        [Required]
        public IList<SocialNetwork> SocialNetworks { get; set; }

        [Required]
        public OfferStatus Status { get; set; }

    }

    public class Negotiation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public Offer Offer { get; set; }

        public IList<Message> Messages { get; set; }
    }

    public class Message
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(1000)]
        public string Description { get; set; }

        [Required]
        public DateTime DateTime { get; set; }
    }

    public abstract class SocialNetwork { 
    
        [Key]
        public int Id { get; set; }

        [Required]
        public int Name { get; set; }

        [Required]
        public int Link { get; set; }
        //...
    }

    public class Youtube : SocialNetwork
    {
        //...
    }


    public enum Type
    {
        Image,
        Video,
        Story
    }

    public enum OfferStatus
    {
        InProcess,
        Canceled,
        Completed
    }

    public enum Interest
    {
        Sport,
        Beauty,
        /////Add more...
        Etc
    }

}
