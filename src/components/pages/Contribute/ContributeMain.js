/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postContribution } from '../../../api/ArticleAPI';
import SuccessModal from "./SuccessModal";
import FailModal from "./FailModal";
import ContributeForm from "./ContributeForm";
import { getArticle } from "../../../api/ArticleAPI";
import { uploadImage } from "../../../api/ImageAPI";
import { v4 as uuidv4 } from 'uuid';

export default function ContributeMain() {
  const [article, setArticle] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailModal, setShowFailModal] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const asyncSet = async () => {
      const response = await getArticle(params.articleName, 3);
      setArticle(response)
    }
    asyncSet()
  }, []);

  const handleValidSubmit = async (form) => {
    const result = await processAndSubmit(form);
    if (result) {
      setShowSuccessModal(true);
    } else {
      setShowFailModal(true);
    }
  }

  const processAndSubmit = async (form) => {
    const id = uuidv4();
    const articleId = params.articleName.replace(/\s/g, '_');
    const contributorName = "Erik";
    const contributorEmail = "erik.johnson@ozu.edu.tr";
    const date = new Date().toISOString();
    const name = form.name.value;
    let imageUrl = article.imageUrl;
    const hasUploadedImage = form.image.files.length > 0;
    const hasImageAdded = form.imageButton !== undefined;
    if (hasUploadedImage && hasImageAdded) {
      const url = await uploadImage(form.image.files[0]);
      if (url) {
        imageUrl = url;
      } else {
        return null;
      }
    } else if (!hasImageAdded) {
      imageUrl = "";
    }
    const imageDescription = form.imageDescription ? form.imageDescription.value : "";
    let i = 0;
    const details = [];
    while (form[`detailTitle${i}`] !== undefined) {
      details.push({
        id: i,
        title: form[`detailTitle${i}`].value,
        description: form[`detailDescription${i}`].value,
      });
      i++;
    }
    const markdown = form.markdown.value;
    const comment = form.comment.value;
    const contributionObject = {
      id,
      articleId,
      contributorName,
      contributorEmail,
      date,
      contribution: {
        name,
        imageUrl,
        imageDescription,
        details,
        markdown,
        comment
      }
    }
    return await postContribution(contributionObject);
  }

  const handleSuccessModalHide = () => {
    setShowSuccessModal(false);
    navigate(`/article/${params.articleName}`);
  }

  const handleFailModalHide = () => {
    setShowFailModal(false);
  }

  return (
    <div className="p-5 pt-4">
      <ContributeForm onValidSubmit={handleValidSubmit} article={article} />
      <SuccessModal show={showSuccessModal} onHide={handleSuccessModalHide} />
      <FailModal show={showFailModal} onHide={handleFailModalHide} />
    </div>
  )
}