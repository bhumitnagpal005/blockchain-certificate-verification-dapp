// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract CertificateVerification {

    struct Certificate {
        string certId;
        string ipfsHash;
        string student;
        string course;
        uint256 issuedAt;
    }

    mapping(string => Certificate) private certificates;

    event CertificateIssued(
        string certId,
        string ipfsHash,
        string student,
        string course,
        uint256 issuedAt
    );

    function issueCertificate(
        string memory certId,
        string memory ipfsHash,
        string memory student,
        string memory course
    ) public {
        require(certificates[certId].issuedAt == 0, "Already issued");

        certificates[certId] = Certificate(
            certId,
            ipfsHash,
            student,
            course,
            block.timestamp
        );

        emit CertificateIssued(
            certId,
            ipfsHash,
            student,
            course,
            block.timestamp
        );
    }

    function verifyCertificate(
        string memory certId
    ) public view returns (
        bool,
        string memory,
        string memory,
        string memory,
        uint256
    ) {
        Certificate memory cert = certificates[certId];

        if (cert.issuedAt == 0) {
            return (false, "", "", "", 0);
        }

        return (
            true,
            cert.ipfsHash,
            cert.student,
            cert.course,
            cert.issuedAt
        );
    }
}
