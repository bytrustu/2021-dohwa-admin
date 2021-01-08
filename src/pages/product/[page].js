import React from 'react';
import MainTitle from '../../component/Content/MainTitle';
import Content from '../../component/Content';
import { Image } from 'antd';
import { useRouter } from 'next/router';
import ContentGroup from '../../component/Content/ContentGroup';
import ContentInputGroup from '../../component/Content/ContentGroup/ContentGroupInputGroup';
import ContentGroupInput from '../../component/Content/ContentGroup/ContentGroupInput';
import config from '../../lib/config';
import { loadProductByIdAPI } from '../../lib/api/product';

const { IMAGE_URL } = config;

const index = () => {

  const router = useRouter();
  const { query: { page } } = router;

  const { response, trigger } = loadProductByIdAPI(page);
  const { data: productData, error, isValidating } = response;

  return (
    <>
      <MainTitle src="/images/maintitle/product-design.svg" title="제품정보 보기" />
      <Content style={{ marginTop: '2rem', paddingTop: '0' }}>
        <ContentGroup title="제품 분류">
          <ContentInputGroup>
            <ContentGroupInput title="대분류">
              {productData?.category}
            </ContentGroupInput>
            <ContentGroupInput title="소분류">
              {productData?.type}
            </ContentGroupInput>
            <ContentGroupInput title="링크">
              <a href={productData?.link} style={{ whiteSpace: 'break-spaces', width: '640px' }}
                 target="_blank">{productData?.link}</a>
            </ContentGroupInput>
          </ContentInputGroup>
        </ContentGroup>
        <ContentGroup title="제품 정보">
          <ContentInputGroup>
            <ContentGroupInput title="이미지">
              <Image src={`${IMAGE_URL}/product/${productData?.type}/${productData?.num}.jpg`} alt="화장품 이미지"
                     width={150} />
            </ContentGroupInput>
            <ContentGroupInput title="상품명">
              <span>{productData?.name}</span>
            </ContentGroupInput>
            <ContentGroupInput title="브랜드">
              <span>{productData?.brand}</span>
            </ContentGroupInput>
            <ContentGroupInput title="화장품 번호">
              <span>{productData?.num}</span>
            </ContentGroupInput>
            <ContentGroupInput title="가격">
              <span>{productData?.cost}</span>
            </ContentGroupInput>
            <ContentGroupInput title="용량">
              <span>{productData?.volume} ({productData?.unit})</span>
            </ContentGroupInput>
            <ContentGroupInput title="평점">
              <span>{productData?.rating} 점</span>
            </ContentGroupInput>
            <ContentGroupInput title="좋은 이유">
              <span style={{ whiteSpace: 'break-spaces', width: '640px' }}>{productData?.good_reason}</span>
            </ContentGroupInput>
          </ContentInputGroup>
        </ContentGroup>

        <ContentGroup title="제품 분석">
          <ContentInputGroup>
            <ContentGroupInput title="나쁜 건성">
              <span>{productData?.bad_dry}</span>
            </ContentGroupInput>
            <ContentGroupInput title="나쁜 지성">
              <span>{productData?.bad_oily}</span>
            </ContentGroupInput>
            <ContentGroupInput title="나쁜 민감성">
              <span>{productData?.bad_sens}</span>
            </ContentGroupInput>
            <ContentGroupInput title="좋은 건성">
              <span>{productData?.good_dry}</span>
            </ContentGroupInput>
            <ContentGroupInput title="좋은 지성">
              <span>{productData?.good_oily}</span>
            </ContentGroupInput>
            <ContentGroupInput title="좋은 민감성">
              <span>{productData?.good_sens}</span>
            </ContentGroupInput>
            <ContentGroupInput title="20가지 주요설분">
              <span>{productData?.caution}</span>
            </ContentGroupInput>
            <ContentGroupInput title="알레르기 유발성분">
              <span>{productData?.allergy}</span>
            </ContentGroupInput>
            <ContentGroupInput title="전성분">
              <span style={{ whiteSpace: 'break-spaces', width: '640px' }}>{productData?.ingredient}</span>
            </ContentGroupInput>
          </ContentInputGroup>
        </ContentGroup>

      </Content>
    </>
  );
};

export default index;